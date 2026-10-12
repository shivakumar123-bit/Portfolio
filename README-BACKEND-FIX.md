# Backend-only contact email fix

This patch is intended to replace only the `backend` folder. Do not edit any React, CSS, or frontend files.

## Install / run on Windows

Open a second VS Code terminal (leave Vite running in its original terminal):

```powershell
cd backend
python -m venv .venv
.venv\Scripts\Activate.ps1
pip install -r requirements.txt
copy .env.example .env
```

Edit `backend/.env` with your real SMTP credentials and recipient email. For Gmail, use a Google App Password, not your normal Gmail password. Save the file and run:

```powershell
python app.py
```

Check http://127.0.0.1:5000/api/health. Confirm `email_configured` is `true` before testing the form.

## SMTP options

- Gmail port 587: `SMTP_PORT=587` and `SMTP_USE_SSL=false` (STARTTLS)
- Gmail port 465: `SMTP_PORT=465` and `SMTP_USE_SSL=true` (implicit SSL)

Do not mix port 465 with STARTTLS. The backend automatically uses SSL when port is 465.

## Troubleshooting

Submit a test message and inspect the Flask terminal. The response in the browser stays generic; the terminal records the SMTP exception, such as authentication rejected, connection timeout, or recipient issue. Never paste/share `.env` or your App Password.

Frontend compatibility preserved: `POST /api/contact` accepts JSON keys `name`, `email`, `message`; success returns `{"message":"Message sent successfully."}` and errors return `{"error":"..."}`. The default frontend API URL `http://127.0.0.1:5000` remains valid.
