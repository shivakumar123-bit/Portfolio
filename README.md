# Python Full Stack Developer Portfolio — React + Vite

A responsive, single-page dark navy portfolio starter with green accents, typing animation, scroll reveal, mobile navigation, project cards, education, resume download, and a Flask contact API.

## 1. Open the correct folder

1. Extract the ZIP file.
2. In VS Code, choose **File → Open Folder** and select the `python-fullstack-portfolio` folder (the one containing `package.json`).
3. Open **Terminal → New Terminal**.
4. Check that the terminal is inside that folder. Run `dir` on Windows and make sure `package.json` appears.

Do not open `index.html` directly and do not run this React project with Live Server. Vite runs it.

## 2. Start the React website

Install Node.js LTS if you do not already have it: https://nodejs.org/

In the VS Code terminal, run:

```bash
npm install
npm run dev
```

Open the local URL Vite prints (usually `http://localhost:5173`). Keep the terminal running while testing. To check the production build later, run `npm run build`.

## 3. Add your professional photo

Put a portrait photo in `public/images/` and name it exactly `profile.jpg`. A clear, well-lit head-and-shoulders photo works well. The design shows a fallback if the photo is missing.

## 4. Add your actual resume

Copy your latest PDF resume into the `public` folder and name it exactly `resume.pdf`. The hero's **Download resume** button downloads that file. Do not commit a sample or someone else's resume.

## 5. Personalise the details

- `index.html`: page title and meta description.
- `src/components/Hero.jsx`: name, role text, social links.
- `src/components/About.jsx`: about paragraph.
- `src/components/Skills.jsx`: edit skills to include only technologies you can discuss in an interview.
- `src/components/Education.jsx`: verify degree and training details.
- `src/components/Contact.jsx`: replace `your.email@example.com` with your real contact email.
- `src/components/Footer.jsx`: replace the LinkedIn placeholder URL with your actual profile.
- `src/data/projects.js`: project descriptions and repository links.

The project preview SVGs are illustrative graphics, not screenshots of your real work. Replace them with your own screenshots, using the same filenames (`warehouse-preview.svg`, `loan-dashboard-preview.svg`, `sales-dashboard-preview.svg`) or update the image paths in `src/data/projects.js`. For screenshots, use PNG or JPG and change the path accordingly.

## 6. Start the Flask contact backend

The form sends messages to the Flask API. To send real email, you must configure an SMTP account. The form will not send email until this is configured.

Install Python 3.10+ if needed: https://www.python.org/downloads/

Open a second VS Code terminal and run:

```bash
cd backend
python -m venv .venv
```

Activate the virtual environment:

**Windows PowerShell**
```powershell
.venv\Scripts\Activate.ps1
```

**Windows Command Prompt**
```bat
.venv\Scripts\activate.bat
```

Then install dependencies and create the environment file:

```bash
pip install -r requirements.txt
copy .env.example .env
```

Open `backend/.env` and set your SMTP settings and the email address where you want to receive messages. For Gmail, use an App Password (requires 2-Step Verification); do not use your regular Gmail password. Keep `.env` private and never push it to GitHub.

Run the backend from the `backend` directory:

```bash
python app.py
```

Test `http://127.0.0.1:5000/api/health` in your browser. It should return a small JSON message. Keep this terminal running as well. The React frontend uses `http://127.0.0.1:5000` by default.

If you only want to preview the design first, run just the frontend; the form will show a clear connection/configuration error until the backend is ready.

## 7. Fix common blank-page problems

- Make sure you opened the folder that contains `package.json`.
- Run `npm install` and then `npm run dev`.
- Open the exact local URL printed by Vite, not the file path to `index.html`.
- If you see a blank page, open browser DevTools with **F12 → Console** and check the first red error. Also check the VS Code terminal for import or syntax errors.
- Ensure `src/main.jsx` imports `./index.css` and `./App.jsx` with the correct file names and capitalisation.
- If dependencies seem broken, stop Vite with `Ctrl+C`, run `npm install`, then `npm run dev` again.

## 8. Deploy the frontend

A simple beginner route is Vercel or Netlify:

1. Push the project to your own GitHub repository.
2. Import the repository in Vercel or Netlify.
3. Set build command to `npm run build` and output directory to `dist`.
4. Deploy and test the published URL on desktop and mobile.

### Important about the contact form in production

The included Flask API is a separate backend. Deploy it to a Python-capable host, configure the same SMTP environment variables there, and set `VITE_API_URL` in your frontend deployment to the deployed API's base URL (no trailing slash). Rebuild/redeploy the frontend after changing `VITE_API_URL`. Configure the backend's `FRONTEND_ORIGIN` to your exact deployed frontend origin. Do not deploy `.env` or expose SMTP credentials in frontend code.

## Folder structure

```text
python-fullstack-portfolio/
├── backend/
│   ├── app.py
│   ├── requirements.txt
│   └── .env.example
├── public/
│   └── images/
├── src/
│   ├── components/
│   ├── data/projects.js
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
└── vite.config.js
```
