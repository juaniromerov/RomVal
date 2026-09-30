/**
 * RomVal Studio — contact form backend (Google Apps Script).
 *
 * Receives POSTs from the website form and emails each inquiry to TO.
 * Deploy: Deploy → New deployment → Web app
 *   Execute as: Me · Who has access: Anyone
 * Then paste the /exec URL into FORM_ENDPOINT in index.html.
 */

var TO = 'juaniromerov@gmail.com';
var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function doPost(e) {
  var p = (e && e.parameter) || {};

  // Honeypot: bots fill the hidden "website" field. Pretend success, send nothing.
  if (p.website) return json({ ok: true });

  var name = clean(p.name, 200);
  var email = clean(p.email, 200);
  var company = clean(p.company, 200);
  var message = clean(p.message, 5000);
  var lang = clean(p.lang, 5) || 'es';
  var page = clean(p.page, 500);

  if (!name || !email || !message || !EMAIL_RE.test(email)) {
    return json({ ok: false, error: 'invalid' });
  }

  var subject = 'Consulta web: ' + name + (company ? ' (' + company + ')' : '');
  var body = [
    'Nueva consulta desde el sitio de RomVal Studio.',
    '',
    'Nombre:  ' + name,
    'Email:   ' + email,
    'Empresa: ' + (company || '—'),
    'Idioma:  ' + lang.toUpperCase(),
    '',
    'Mensaje:',
    message,
    '',
    '—',
    'Enviado desde ' + (page || 'el sitio web') + ' el ' + new Date().toLocaleString('es-AR', { timeZone: 'America/Argentina/Buenos_Aires' }),
    'Responde a este email para contestarle directamente a ' + name + '.'
  ].join('\n');

  MailApp.sendEmail({
    to: TO,
    replyTo: email,
    name: 'RomVal Studio · Web',
    subject: subject,
    body: body
  });

  return json({ ok: true });
}

// Visiting the URL in a browser just confirms the deployment is alive.
function doGet() {
  return json({ ok: true, service: 'romval-contact' });
}

// Run this once from the editor to authorize and check that the email arrives.
function testSend() {
  doPost({ parameter: {
    name: 'Prueba',
    email: TO,
    company: 'RomVal',
    message: 'Mensaje de prueba del formulario.',
    lang: 'es',
    page: 'editor de Apps Script'
  }});
}

function clean(v, max) {
  return String(v == null ? '' : v).trim().slice(0, max);
}

function json(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
