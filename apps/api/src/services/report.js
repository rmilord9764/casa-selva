import PDFDocument from 'pdfkit';
export function buildReport({ summary, monthly, bookings }) {
  const doc = new PDFDocument({ size: 'A4', margin: 50 }); const chunks = [];
  doc.on('data', c => chunks.push(c));
  const COCOA = '#4A352B', SAGE = '#6B7A5C';
  doc.rect(0,0,doc.page.width,90).fill(COCOA);
  doc.fillColor('#F2EDE4').fontSize(22).font('Helvetica-Bold').text('Reporte de Operaciones', 50, 35);
  doc.fillColor('#F2EDE4').fontSize(10).text('Generado: '+new Date().toLocaleString('es-MX'), 50, 64);
  let y = 120;
  doc.fillColor(COCOA).fontSize(15).font('Helvetica-Bold').text('Resumen', 50, y); y+=26;
  const kpis = [['Confirmadas', summary.confirmed],['Canceladas', summary.cancelled],
    ['Ingresos', '$'+(summary.revenue_cents/100).toFixed(2)],['Huespedes unicos', summary.unique_guests]];
  doc.fontSize(11).font('Helvetica');
  kpis.forEach(([k,v]) => { doc.fillColor(SAGE).text(k,50,y); doc.fillColor('#222').text(String(v),300,y); y+=20; });
  y+=16; doc.fillColor(COCOA).fontSize(15).font('Helvetica-Bold').text('Ingresos por mes', 50, y); y+=24;
  doc.fontSize(10).font('Helvetica');
  monthly.forEach(m => { doc.fillColor(SAGE).text(m.month,50,y); doc.fillColor('#222').text(m.bookings+' reservas',160,y);
    doc.text('$'+(m.revenue/100).toFixed(2),320,y); y+=16; });
  y+=24; doc.fillColor(COCOA).fontSize(15).font('Helvetica-Bold').text('Ultimas reservas', 50, y); y+=22;
  doc.fontSize(9).font('Helvetica');
  bookings.slice(0,25).forEach(b => { if(y>760){doc.addPage();y=50;}
    doc.fillColor('#222').text(b.reference+' - '+b.full_name+' - '+new Date(b.check_in).toLocaleDateString('es-MX')+' - '+b.status,50,y); y+=14; });
  doc.end();
  return new Promise(res => doc.on('end', () => res(Buffer.concat(chunks))));
}
