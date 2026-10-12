import logging
import os
import re
import smtplib
import ssl
from email.message import EmailMessage

from dotenv import load_dotenv
from flask import Flask, jsonify, request
from flask_cors import CORS

# Load backend/.env when running this file from the backend folder.
load_dotenv()

app = Flask(__name__)
app.config["MAX_CONTENT_LENGTH"] = 32 * 1024
logging.basicConfig(level=logging.INFO)

allowed_origins = [
    origin.strip().rstrip("/")
    for origin in os.getenv(
        "FRONTEND_ORIGIN", "http://localhost:5173,http://127.0.0.1:5173"
    ).split(",")
    if origin.strip()
]
CORS(app, resources={r"/api/*": {"origins": allowed_origins}})


def email_settings():
    """Return SMTP settings without exposing secrets in responses/logs."""
    required = ["SMTP_HOST", "SMTP_USERNAME", "SMTP_PASSWORD", "CONTACT_TO_EMAIL"]
    missing = [key for key in required if not os.getenv(key, "").strip()]
    if missing:
        return None, missing

    try:
        port = int(os.getenv("SMTP_PORT", "587"))
    except ValueError:
        return None, ["SMTP_PORT must be a number"]

    if not 1 <= port <= 65535:
        return None, ["SMTP_PORT must be between 1 and 65535"]

    return {
        "host": os.environ["SMTP_HOST"].strip(),
        "port": port,
        "username": os.environ["SMTP_USERNAME"].strip(),
        "password": os.environ["SMTP_PASSWORD"].strip().replace(" ", ""),
        "to_email": os.environ["CONTACT_TO_EMAIL"].strip(),
        # Port 465 normally uses implicit SSL; port 587 normally uses STARTTLS.
        "use_ssl": os.getenv("SMTP_USE_SSL", "").strip().lower()
        in ("1", "true", "yes"),
    }, []


@app.get("/api/health")
def health():
    settings, missing = email_settings()
    return jsonify({
        "status": "ok",
        "message": "Portfolio contact API is running.",
        "email_configured": settings is not None,
        "email_configuration_issue": ", ".join(missing) if missing else None,
    })


@app.post("/api/contact")
def contact():
    data = request.get_json(silent=True)
    if not isinstance(data, dict):
        return jsonify({"error": "Please submit the form as JSON."}), 400

    name = str(data.get("name", "")).strip()
    sender_email = str(data.get("email", "")).strip()
    message = str(data.get("message", "")).strip()

    if not 2 <= len(name) <= 100:
        return jsonify({"error": "Please enter a name between 2 and 100 characters."}), 400
    if len(sender_email) > 254 or not re.fullmatch(r"[^\s@]+@[^\s@]+\.[^\s@]+", sender_email):
        return jsonify({"error": "Please enter a valid email address."}), 400
    if not 5 <= len(message) <= 5000:
        return jsonify({"error": "Please enter a message between 5 and 5000 characters."}), 400

    settings, missing = email_settings()
    if settings is None:
        app.logger.error("Email configuration issue: %s", ", ".join(missing))
        return jsonify({"error": "Email service is not configured. Check backend/.env and restart Flask."}), 503

    mail = EmailMessage()
    mail["Subject"] = f"Portfolio message from {name}"
    mail["From"] = settings["username"]
    mail["To"] = settings["to_email"]
    mail["Reply-To"] = sender_email
    mail.set_content(
        f"New message from your portfolio contact form\n\n"
        f"Name: {name}\nEmail: {sender_email}\n\nMessage:\n{message}\n"
    )

    try:
        context = ssl.create_default_context()
        if settings["use_ssl"] or settings["port"] == 465:
            with smtplib.SMTP_SSL(
                settings["host"], settings["port"], timeout=20, context=context
            ) as server:
                server.login(settings["username"], settings["password"])
                server.send_message(mail)
        else:
            with smtplib.SMTP(settings["host"], settings["port"], timeout=20) as server:
                server.ehlo()
                server.starttls(context=context)
                server.ehlo()
                server.login(settings["username"], settings["password"])
                server.send_message(mail)
    except (OSError, ValueError, smtplib.SMTPException) as exc:
        # The detailed reason is shown in the Flask terminal, never to website visitors.
        app.logger.exception("Email delivery failed (%s): %s", type(exc).__name__, exc)
        return jsonify({"error": "The email could not be sent. Check the Flask terminal for the SMTP error."}), 502

    app.logger.info("Portfolio contact email sent successfully to configured recipient.")
    return jsonify({"message": "Message sent successfully."}), 200


if __name__ == "__main__":
    # debug=False avoids the interactive debugger on a reachable server.
    app.run(host="127.0.0.1", port=int(os.getenv("PORT", "5000")), debug=False)
