'use client';
import { useEffect, useState } from 'react';
const API = process.env.NEXT_PUBLIC_API_URL!;
const authHeader = () => ({ Authorization: 'Bearer ' + localStorage.getItem('cs_token') });
const Card = ({title,value}:{title:string;value:any}) => (
  <div className="border border-cocoa/20 bg-cream-dark p-6 text-center">
    <p className="text-sage text-xs uppercase tracking-wide">{title}</p>
    <p className="font-display text-3xl text-cocoa mt-2">{value}</p>
  </div>
);
export default function Admin() {
  const [token, setToken] = useState<string|null>(null);
  const [tab, setTab] = useState<'cal'|'guests'|'pay'|'stats'>('cal');
  const [creds, setCreds] = useState({ email:'', password:'' });
  const [bookings, setBookings] = useState<any[]>([]);
  const [guests, setGuests] = useState<any[]>([]);
  const [payments, setPayments] = useState<any[]>([]);
  const [stats, setStats] = useState<any>(null);
  useEffect(() => { setToken(localStorage.getItem('cs_token')); }, []);
  async function login(e: React.FormEvent) {
    e.preventDefault();
    const r = await fetch(`${API}/api/admin/login`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(creds) }).then(r=>r.json());
    if (r.token) { localStorage.setItem('cs_token', r.token); setToken(r.token); } else alert('Credenciales inválidas');
  }
  async function load() {
    const h = authHeader();
    setBookings(await fetch(`${API}/api/admin/bookings`, { headers:h }).then(r=>r.json()));
    setGuests(await fetch(`${API}/api/admin/guests`, { headers:h }).then(r=>r.json()));
    setPayments(await fetch(`${API}/api/admin/payments`, { headers:h }).then(r=>r.json()));
    setStats(await fetch(`${API}/api/admin/stats`, { headers:h }).then(r=>r.json()));
  }
  useEffect(() => { if (token) load(); }, [token]);
  async function cancel(id:string){ if(!confirm('¿Cancelar y reembolsar?'))return;
    await fetch(`${API}/api/admin/bookings/${id}/cancel`,{method:'PATCH',headers:authHeader()}); load(); }
  if (!token) return (
    <main className="max-w-sm mx-auto py-32 px-6">
      <h1 className="font-display text-3xl text-cocoa mb-6 text-center">Admin · Casa Selva</h1>
      <form onSubmit={login} className="space-y-3">
        <input placeholder="Email" className="border border-cocoa/20 p-3 w-full" onChange={e=>setCreds({...creds,email:e.target.value})}/>
        <input placeholder="Contraseña" type="password" className="border border-cocoa/20 p-3 w-full" onChange={e=>setCreds({...creds,password:e.target.value})}/>
        <button className="btn-outline w-full text-cocoa">Entrar</button>
      </form>
    </main>
  );
  return (
    <main className="max-w-6xl mx-auto py-12 px-6">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-3xl text-cocoa">Panel de administración</h1>
        <div className="flex gap-3">
          <a href={`${API}/api/admin/export/excel`} className="btn-outline text-cocoa text-xs">Excel</a>
          <a href={`${API}/api/admin/export/pdf`} className="btn-outline text-cocoa text-xs">PDF</a>
          <button onClick={()=>{localStorage.removeItem('cs_token');setToken(null);}} className="btn-outline text-cocoa text-xs">Salir</button>
        </div>
      </div>
      <nav className="flex gap-6 border-b border-cocoa/20 mb-8">
        {[['cal','Calendario'],['guests','Huéspedes'],['pay','Pagos'],['stats','Estadísticas']].map(([k,l])=>(
          <button key={k} onClick={()=>setTab(k as any)} className={`pb-3 ${tab===k?'border-b-2 border-terracotta text-cocoa':'text-sage'}`}>{l}</button>
        ))}
      </nav>
      {tab==='cal' && (
        <table className="w-full text-sm"><thead><tr className="text-left text-sage border-b">
          <th className="py-2">Reserva</th><th>Huésped</th><th>Experiencia</th><th>Entrada</th><th>Estado</th><th></th></tr></thead>
          <tbody>{bookings.map(b=>(<tr key={b.id} className="border-b border-cocoa/10">
            <td className="py-2">{b.reference}</td><td>{b.full_name}</td><td>{b.experience}</td>
            <td>{new Date(b.check_in).toLocaleString('es-MX')}</td><td>{b.status}</td>
            <td>{b.status!=='cancelled' && <button onClick={()=>cancel(b.id)} className="text-terracotta text-xs">Cancelar</button>}</td></tr>))}</tbody></table>
      )}
      {tab==='guests' && (
        <table className="w-full text-sm"><thead><tr className="text-left text-sage border-b">
          <th className="py-2">Nombre</th><th>Email</th><th>Reservas</th><th>Valor</th></tr></thead>
          <tbody>{guests.map(g=>(<tr key={g.id} className="border-b border-cocoa/10">
            <td className="py-2">{g.full_name}</td><td>{g.email}</td><td>{g.total_bookings}</td><td>\${(g.lifetime_value/100).toFixed(2)}</td></tr>))}</tbody></table>
      )}
      {tab==='pay' && (
        <table className="w-full text-sm"><thead><tr className="text-left text-sage border-b">
          <th className="py-2">Reserva</th><th>Huésped</th><th>Monto</th><th>Estado</th></tr></thead>
          <tbody>{payments.map(p=>(<tr key={p.id} className="border-b border-cocoa/10">
            <td className="py-2">{p.reference}</td><td>{p.full_name}</td><td>\${(p.amount_cents/100).toFixed(2)}</td><td>{p.status}</td></tr>))}</tbody></table>
      )}
      {tab==='stats' && stats && (
        <div className="grid sm:grid-cols-4 gap-4">
          <Card title="Confirmadas" value={stats.summary.confirmed}/>
          <Card title="Canceladas" value={stats.summary.cancelled}/>
          <Card title="Ingresos" value={'\$'+(stats.summary.revenue_cents/100).toFixed(2)}/>
          <Card title="Huéspedes" value={stats.summary.unique_guests}/>
        </div>
      )}
    </main>
  );
}
