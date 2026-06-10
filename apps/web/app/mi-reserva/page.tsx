'use client';
import { useState } from 'react';
import { api } from '@/lib/api';
const Row = ({label,value}:{label:string;value:string}) => (
  <div className="flex justify-between border-b border-cocoa/10 pb-2">
    <span className="text-sage text-sm uppercase tracking-wide">{label}</span>
    <span className="text-cocoa">{value}</span>
  </div>
);
export default function MiReserva() {
  const [reference, setReference] = useState('');
  const [email, setEmail] = useState('');
  const [data, setData] = useState<any>(null);
  const [err, setErr] = useState('');
  async function lookup(e: React.FormEvent) {
    e.preventDefault(); setErr('');
    const res = await api.lookup(reference.trim(), email.trim());
    if (res.error) { setErr(res.error); setData(null); } else setData(res);
  }
  return (
    <main className="max-w-lg mx-auto py-24 px-6">
      <h1 className="font-display text-4xl text-cocoa text-center mb-8">Mi reserva</h1>
      {!data && (
        <form onSubmit={lookup} className="space-y-4">
          <input placeholder="Número de reserva (CS-…)" className="border border-cocoa/20 p-3 w-full" value={reference} onChange={e=>setReference(e.target.value)} required />
          <input placeholder="Email de la reserva" type="email" className="border border-cocoa/20 p-3 w-full" value={email} onChange={e=>setEmail(e.target.value)} required />
          <button className="btn-outline w-full text-cocoa">Ver mi reserva</button>
          {err && <p className="text-terracotta text-center">{err}</p>}
        </form>
      )}
      {data && (
        <div className="border border-cocoa/20 bg-cream-dark p-8 space-y-3">
          <Row label="Reserva" value={data.reference} />
          <Row label="Huésped" value={data.full_name} />
          <Row label="Experiencia" value={data.experience} />
          <Row label="Entrada" value={new Date(data.check_in).toLocaleString('es-MX')} />
          <Row label="Salida" value={new Date(data.check_out).toLocaleString('es-MX')} />
          <Row label="Estado" value={data.status} />
          {data.address ? (
            <div className="mt-6 p-4 bg-cream border border-sage">
              <p className="text-sage text-xs uppercase tracking-wide mb-1">Dirección privada</p>
              <p>{data.address}</p>
              <a href={data.maps_url} target="_blank" className="text-terracotta text-sm underline">Ver mapa</a>
            </div>
          ) : <p className="mt-4 text-sage text-sm">La dirección se mostrará una vez confirmado el pago.</p>}
        </div>
      )}
    </main>
  );
}
