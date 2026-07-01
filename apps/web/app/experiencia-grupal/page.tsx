"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

// weekday: 0=Sunday, 6=Saturday
function nextLastWeekday(weekday: number) {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  for (let add = 0; add < 3; add++) {
    const y = now.getFullYear();
    const m = now.getMonth() + add;
    const lastDay = new Date(y, m + 1, 0);
    const diff = (lastDay.getDay() - weekday + 7) % 7;
    const target = new Date(y, m + 1, 0 - diff);
    target.setHours(0, 0, 0, 0);
    if (target.getTime() >= now.getTime()) return target;
  }
  return new Date(now.getFullYear(), now.getMonth() + 1, 0);
}

function withinWindow(target: Date) {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const diffDays = Math.round((target.getTime() - now.getTime()) / 86400000);
  return diffDays >= 0 && diffDays <= 7;
}

function fmt(d: Date, locale: string) {
  return d.toLocaleDateString(locale, { weekday: "long", day: "numeric", month: "long" });
}

export default function ExperienciaGrupalPage() {
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);

  const sunday = nextLastWeekday(0);
  const saturday = nextLastWeekday(6);
  const esActive = withinWindow(sunday);
  const enActive = withinWindow(saturday);

  return (
    <main className="min-h-screen bg-[#f3ede1] px-6 py-20">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 flex justify-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#c9b892] bg-white/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#7a8b6f]">✦ Experiencia especial mensual · Monthly special</span>
        </div>
        <h1 className="mb-3 text-center font-serif text-4xl md:text-5xl text-[#3d3526]">Experiencia grupal · Group Experience</h1>
        <p className="mx-auto mb-12 max-w-2xl text-center text-sm text-[#7a6c58]">$150 por persona · 2–3 horas · Grupos de 6 a 10 personas</p>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="group overflow-hidden rounded-2xl border border-[#d8c7a8] bg-white/60 shadow-lg transition hover:shadow-xl">
            <div className="overflow-hidden">
              <img src="/galeria/WhatsApp%20Image%202026-06-05%20at%2011.11.08%20AM.webp" alt="The Casa Selva Experience flyer (Espanol)" decoding="async" className="w-full transition duration-700 group-hover:scale-105" />
            </div>
            <div className="p-6 text-center">
              <p className="text-xs font-bold uppercase tracking-widest text-[#7a8b6f]">En español</p>
              <p className="mt-1 text-sm font-medium text-[#5c4f40]">Guiada · Último domingo de cada mes</p>
              <p className="mt-2 text-sm text-[#8a7c66]">Próximo: {ready ? fmt(sunday, "es-ES") : "…"}</p>
              {ready && esActive ? (
                <Link href="/reservar" className="mt-4 inline-block rounded-full bg-[#7a8b6f] px-8 py-3 text-xs font-semibold uppercase tracking-widest text-white transition hover:bg-[#697a5f]">Reservar en español</Link>
              ) : (
                <span className="mt-4 inline-block cursor-not-allowed rounded-full bg-[#d8ceba] px-8 py-3 text-xs font-semibold uppercase tracking-widest text-[#9a8d76]">Disponible pronto</span>
              )}
            </div>
          </div>

          <div className="group overflow-hidden rounded-2xl border border-[#d8c7a8] bg-white/60 shadow-lg transition hover:shadow-xl">
            <div className="overflow-hidden">
              <img src="/galeria/WhatsApp%20Image%202026-06-05%20at%2011.11.39%20AM.webp" alt="The Casa Selva Experience flyer (English)" decoding="async" className="w-full transition duration-700 group-hover:scale-105" />
            </div>
            <div className="p-6 text-center">
              <p className="text-xs font-bold uppercase tracking-widest text-[#7a8b6f]">In English</p>
              <p className="mt-1 text-sm font-medium text-[#5c4f40]">Guided · Last Saturday of each month</p>
              <p className="mt-2 text-sm text-[#8a7c66]">Next: {ready ? fmt(saturday, "en-US") : "…"}</p>
              {ready && enActive ? (
                <Link href="/reservar" className="mt-4 inline-block rounded-full bg-[#7a8b6f] px-8 py-3 text-xs font-semibold uppercase tracking-widest text-white transition hover:bg-[#697a5f]">Book in English</Link>
              ) : (
                <span className="mt-4 inline-block cursor-not-allowed rounded-full bg-[#d8ceba] px-8 py-3 text-xs font-semibold uppercase tracking-widest text-[#9a8d76]">Available soon</span>
              )}
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link href="/#experiencia" className="text-sm uppercase tracking-widest text-[#7a8b6f] underline underline-offset-4 hover:text-[#697a5f]">← Volver · Back</Link>
        </div>
      </div>
    </main>
  );
}
