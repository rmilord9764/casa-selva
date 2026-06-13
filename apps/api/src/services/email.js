import sg from '@sendgrid/mail';
import { config } from '../config.js';
sg.setApiKey(config.sendgrid.apiKey);
const shell = (title, body) => `<div style="font-family:Georgia,serif;background:#F2EDE4;padding:32px">
  <div style="max-width:560px;margin:auto;background:#fff;border:1px solid #e6ddcf">
    <div style="background:#4A352B;color:#F2EDE4;padding:28px 32px"><h1 style="margin:0;font-size:22px">THE CASA SELVA</h1>
    <p style="margin:4px 0 0;font-size:12px;opacity:.8">Day Wellness Retreat</p></div>
    <div style="padding:32px;color:#5A4A3F;line-height:1.6"><h2 style="color:#4A352B">${title}</h2>${body}</div></div></div>`;
export async function sendEmail({ to, subject, html, attachments }) {
    try {
      const [resp] = await sg.send({ to, from: config.sendgrid.from, subject, html, attachments });
      console.error('MAIL OK:', resp?.statusCode, 'to=', to, 'from=', config.sendgrid.from);
    } catch (e) {
      console.error('MAIL ERROR:', e?.code, JSON.stringify(e?.response?.body || e?.message));
    }
}
export const templates = {
  welcome: (g) => shell('Bienvenido/a', `<p>Hola ${g.full_name}, gracias por elegir The Casa Selva.</p>`),
  confirmation: (b, g, exp) => shell('Tu reserva esta confirmada', `
    <p>Hola ${g.full_name}, tu reserva fue confirmada.</p>
    <p><b>Reserva:</b> ${b.reference}<br><b>Experiencia:</b> ${exp.name}<br>
    <b>Entrada:</b> ${new Date(b.check_in).toLocaleString('es-MX')}<br>
    <b>Salida:</b> ${new Date(b.check_out).toLocaleString('es-MX')}</p>
    <div style="margin-top:20px;padding:16px;background:#F2EDE4;border-radius:6px">
      <b>Direccion privada</b><br>${config.property.fullAddress}<br>
      <a href="${config.property.mapsUrl}">Ver mapa</a></div>
    <p style="margin-top:16px">Adjuntamos tu voucher en PDF.</p>`),
  reminder: (b, g, hours) => shell('Recordatorio de tu retiro',
    `<p>Hola ${g.full_name}, te recordamos tu reserva ${b.reference} para el ${new Date(b.check_in).toLocaleString('es-MX')}.</p>`),
  followup: (g) => shell('Gracias por visitarnos', `<p>Hola ${g.full_name}, esperamos que tu reset haya sido profundo.</p>`),
};
