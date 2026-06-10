import PDFDocument from 'pdfkit';
export function buildVoucher(booking, guest, experience, address, mapsUrl) {
  const doc = new PDFDocument({ size: 'A4', margin: 50 }); const chunks = [];
  doc.on('data', (c) => chunks.push(c));
  const COCOA = '#4A352B', SAGE = '#6B7A5C', CREAM = '#F2EDE4';
  doc.rect(0,0,doc.page.width,120).fill(COCOA);
  doc.fillColor(CREAM).fontSize(28).font('Helvetica-Bold').text('THE CASA SELVA', 50, 40);
  doc.fillColor(CREAM).fontSize(12).font('Helvetica').text('Day Wellness Retreat', 50, 78);
  doc.fillColor(COCOA).fontSize(20).font('Helvetica-Bold').text('Confirmacion de Reserva', 50, 160);
  const line = (label, value, y) => {
    doc.fillColor(SAGE).fontSize(10).font('Helvetica-Bold').text(label.toUpperCase(), 50, y);
    doc.fillColor('#333').fontSize(13).font('Helvetica').text(value, 50, y + 14); };
  let y = 210;
  line('Numero de reserva', booking.reference, y); y+=50;
  line('Huesped', guest.full_name, y); y+=50;
  line('Experiencia', experience.name, y); y+=50;
  line('Check-in', new Date(booking.check_in).toLocaleString('es-MX'), y); y+=50;
  line('Check-out', new Date(booking.check_out).toLocaleString('es-MX'), y); y+=50;
  line('Huespedes', String(booking.guests_count), y); y+=50;
  line('Total pagado', '$'+(booking.amount_cents/100).toFixed(2)+' '+booking.currency, y); y+=60;
  doc.rect(50,y,doc.page.width-100,80).fill(CREAM);
  doc.fillColor(COCOA).fontSize(11).font('Helvetica-Bold').text('DIRECCION PRIVADA (confidencial)', 65, y+14);
  doc.fillColor('#333').fontSize(12).font('Helvetica').text(address, 65, y+34);
  doc.fillColor(SAGE).fontSize(10).text(mapsUrl, 65, y+58);
  doc.fillColor('#999').fontSize(9).text('Contacto: +1 (305) 916-9438 - thecasaselva@gmail.com', 50, 760, { align: 'center' });
  doc.end();
  return new Promise((res) => doc.on('end', () => res(Buffer.concat(chunks))));
}
