# RomVal Studio — Website

Sitio web de RomVal Studio: un estudio de software que convierte procesos críticos en hojas de cálculo frágiles en software confiable. Buenos Aires, para toda América Latina.

Single-page static site (`index.html`), bilingual ES/EN, no build step. Open `index.html` in a browser to preview.

## Contact form

The form in the Contacto section posts to a Google Apps Script web app (`backend/Code.gs`), which emails each inquiry to juaniromerov@gmail.com with Reply-To set to the sender.

Setup (one time):
1. Go to https://script.google.com → **New project**, paste `backend/Code.gs`, save.
2. Select `testSend` → **Run**, authorize, and check that the test email arrives.
3. **Deploy → New deployment → Web app**. Execute as: **Me**. Who has access: **Anyone**. Copy the `/exec` URL.
4. Put that URL in `FORM_ENDPOINT` in `index.html`, commit and publish.

After editing `Code.gs`, use **Deploy → Manage deployments → Edit → New version** so the URL stays the same.
