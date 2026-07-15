'use client';
import { useEffect, useState } from 'react';
import Script from 'next/script';
import { api } from '@/lib/api';
type Exp = { id:string; slug:string; name:string; base_price_cents:number };
type Slot = { id:string; experience_id:string; starts_at:string };
export default function Reservar() {
const [exp, setExp] = useState<Exp | null>(null);
const [slots, setSlots] = useState<Slot[]>([]);
const [slot, setSlot] = useState<Slot | null>(null);
const [guest, setGuest] = useState({ full_name:'', email:'', phone:'' });
const [card, setCard] = useState<any>(null);
const [status, setStatus] = useState('');
const [result, setResult] = useState<any>(null);
const [sqReady, setSqReady] = useState(false);
const [consent, setConsent] = useState(false);
const [occasion, setOccasion] = useState('');
const [occasionOther, setOccasionOther] = useState('');
useEffect(() => { api.experiences().then((list: Exp[]) => { const wanted = new URLSearchParams(window.location.search).get('exp'); if (wanted) { const found = list.find((e) => e.slug === wanted); if (found) { setExp(found); } } }); }, []);
useEffect(() => {
if (!exp) return;
const load = () => {
const from = new Date().toISOString();
const to = new Date(Date.now() + 60*864e5).toISOString();
api.availability({ experienceId: exp.id, from, to }).then(setSlots);
};
load(); const t = setInterval(load, 20000); return () => clearInterval(t);
}, [exp]);
async function initSquare() {
if (card) return;
// @ts-ignore
const payments = window.Square.payments(process.env.NEXT_PUBLIC_SQUARE_APP_ID, process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID);
const c = await payments.card();
await c.attach('#card-container');
setCard(c);
}
useEffect(() => {
if (sqReady && slot && !card) { initSquare(); }
}, [sqReady, slot, card]);
async function pay() {
if (!card || !slot || !exp) return;
setStatus('Procesando pago…');
const tok = await card.tokenize();
if (tok.status !== 'OK') { setStatus('Error con la tarjeta'); return; }
const res = await api.book({ slotId: slot.id, experienceId: exp.id, guestsCount: 1, guest, occasion: showOccasion ? (occasion === 'Other' ? ('Other: ' + occasionOther) : occasion) : '', consentAt: new Date().toISOString(), sourceId: tok.token });
if (res.error) setStatus(res.error); else { setResult(res); setStatus(''); }
}
const showOccasion = !!exp;
if (result) return (
<div className="max-w-lg mx-auto py-32 px-6 text-center">
<h1 className="font-display text-4xl text-cocoa">¡Reserva confirmada! 🌿</h1>
<p className="mt-4">Tu número de reserva es <b>{result.reference}</b>.</p>
<p className="mt-2">{result.message}</p>
<p className="mt-6 text-sm text-sage">Por privacidad, la dirección exacta se envió a tu correo y a tu voucher PDF.</p>
</div>
);
return (
<main className="max-w-3xl mx-auto py-24 px-6">
<Script src={`https://${process.env.NEXT_PUBLIC_SQUARE_ENV==='production'?'web':'sandbox.web'}.squarecdn.com/v1/square.js`} onLoad={() => setSqReady(true)}/>
<h1 className="font-display text-5xl text-cocoa text-center mb-12">Reserva tu experiencia</h1>
{!exp && (
<p className="text-center text-sage">Cargando disponibilidad…</p>
)}
{exp && (
<section className="mb-10">
<h2 className="font-display text-2xl text-cocoa mb-4">1 · Elige tu fecha</h2>
{slots.length === 0 ? <p className="text-sage">No hay fechas disponibles por ahora.</p> : (
<div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
{slots.map(s => { const d = new Date(s.starts_at); return (
<button key={s.id} onClick={() => setSlot(s)}
className={`border p-3 text-sm transition ${slot?.id===s.id?'border-terracotta bg-cream-dark':'border-cocoa/20 hover:border-sage'}`}>
{d.toLocaleDateString('es-MX',{ weekday:'short', day:'2-digit', month:'short' })}<br/>
<span className="text-sage">{d.toLocaleTimeString('es-MX',{hour:'2-digit',minute:'2-digit'})}</span>
</button>
);})}
</div>
)}
<p className="text-xs text-sage mt-3">La disponibilidad se actualiza en vivo. Las fechas reservadas desaparecen automáticamente.</p>
</section>
)}
{slot && (
<section>
<h2 className="font-display text-2xl text-cocoa mb-4">2 · Tus datos y pago</h2>
<div className="grid sm:grid-cols-2 gap-4">
<input placeholder="Nombre completo" className="border border-cocoa/20 p-3" value={guest.full_name} onChange={e=>setGuest({...guest,full_name:e.target.value})}/>
<input placeholder="Email" type="email" className="border border-cocoa/20 p-3" value={guest.email} onChange={e=>setGuest({...guest,email:e.target.value})}/>
<input placeholder="Teléfono" className="border border-cocoa/20 p-3 sm:col-span-2" value={guest.phone} onChange={e=>setGuest({...guest,phone:e.target.value})}/>
</div>
{showOccasion && (
<div className="mt-6">
<label className="block font-display text-lg text-cocoa mb-2">¿Es para una ocasión especial?</label>
<select value={occasion} onChange={e=>setOccasion(e.target.value)} className="border border-cocoa/20 p-3 w-full">
<option value="">Selecciona una opción (opcional)</option>
<option value="Aniversario">Aniversario</option>
<option value="Cumpleaños">Cumpleaños</option>
<option value="Bachelor">Bachelor</option>
<option value="Other">Otra ocasión</option>
</select>
{occasion === 'Other' && (
<input placeholder="Escribe la ocasión" className="border border-cocoa/20 p-3 w-full mt-3" value={occasionOther} onChange={e=>setOccasionOther(e.target.value)} />
)}
</div>
)}
<div id="card-container" className="mt-6 border border-cocoa/20 p-4 rounded" />
<label className="mt-6 flex items-start gap-2 text-xs text-sage leading-snug"><input type="checkbox" checked={consent} onChange={e=>setConsent(e.target.checked)} className="mt-1" /><span>Confirmo que la dirección exacta de la propiedad es privada y confidencial. Me comprometo a no compartirla, publicarla ni divulgarla a terceros. Entiendo que hacerlo puede dar lugar a acciones legales en mi contra.</span></label>
<button onClick={pay} disabled={!guest.full_name || !guest.email || !consent} className="btn-outline mt-6 w-full text-cocoa disabled:opacity-40">Pagar y confirmar reserva</button>
{status && <p className="mt-4 text-center text-terracotta">{status}</p>}
<p className="text-xs text-sage mt-4 text-center">Pago seguro procesado por Square. No almacenamos datos de tu tarjeta.</p>
</section>
)}
</main>
);
}
