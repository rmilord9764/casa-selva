"use client";

import { useState } from "react";
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

export default function GroupSession() {
  const [open, setOpen] = useState(false);
  const sunday = nextLastWeekday(0);
  const saturday = nextLastWeekday(6);
  const esActive = withinWindow(sunday);
  const enActive = withinWindow(saturday);

  return (
    <div className="mt-6 border-t border-[#e2d5bb] pt-6">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="mx-auto flex items-center gap-2 rounded-full border border-[#c9b892] bg-[#f3ede1] px-6 py-2.5 text-xs font-semibold uppercase tracking-widest text-[#7a8b6f] transition hover:bg-[#e9e0cf]"
      >
        <span>{open ? "✕" : "✦"}</span>
        {open ? "Ocultar fechas · Hide dates" : "Ver fechas de grupo · See group dates"}
      </button>

      {open && (
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="group overflow-hidden rounded-xl border border-[#e2d5bb] bg-white/70 shadow-sm">
            <div className="overflow-hidden">
              <img src="/galeria/WhatsApp%20Image%202026-06-05%20at%2011.11.08%20AM.webp" alt="The Casa Selva Experience flyer (Espanol)" loading="lazy" decoding="async" className="w-full transition duration-700 group-hover:scale-105" />
            </div>
            <div className="p-4 text-center">
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#7a8b6f]">En español</p>
              <p className="mt-1 text-xs font-medium text-[#5c4f40]">Guiada · Último domingo de cada mes</p>
              <p className="mt-2 text-[11px] text-[#8a7c66]">Próximo: {fmt(sunday, "es-ES")}</p>
              {esActive ? (
                <Link href="/reservar" className="mt-3 inline-block rounded-full bg-[#7a8b6f] px-6 py-2.5 text-[11px] font-semibold uppercase tracking-widest text-white transition hover:bg-[#697a5f]">Reservar en español</Link>
              ) : (
                <span className="mt-3 inline-block cursor-not-allowed rounded-full bg-[#d8ceba] px-6 py-2.5 text-[11px] font-semibold uppercase tracking-widest text-[#9a8d76]">Disponible pronto</span>
              )}
            </div>
          </div>
          <div className="group overflow-hidden rounded-xl border border-[#e2d5bb] bg-white/70 shadow-sm">
            <div className="overflow-hidden">
              <img src="/galeria/WhatsApp%20Image%202026-06-05%20at%2011.11.39%20AM.webp" alt="The Casa Selva Experience flyer (English)" loading="lazy" decoding="async" className="w-full transition duration-700 group-hover:scale-105" />
            </div>
            <div className="p-4 text-center">
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#7a8b6f]">In English</p>
              <p className="mt-1 text-xs font-medium text-[#5c4f40]">Guided · Last Saturday of each month</p>
              <p className="mt-2 text-[11px] text-[#8a7c66]">Next: {fmt(saturday, "en-US")}</p>
              {enActive ? (
                <Link href="/reservar" className="mt-3 inline-block rounded-full bg-[#7a8b6f] px-6 py-2.5 text-[11px] font-semibold uppercase tracking-widest text-white transition hover:bg-[#697a5f]">Book in English</Link>
              ) : (
                <span className="mt-3 inline-block cursor-not-allowed rounded-full bg-[#d8ceba] px-6 py-2.5 text-[11px] font-semibold uppercase tracking-widest text-[#9a8d76]">Available soon</span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
