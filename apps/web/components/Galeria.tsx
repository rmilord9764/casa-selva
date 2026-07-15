"use client";

import { useState } from "react";
import Image from "next/image";

export default function Galeria({ fotos }: { fotos: string[] }) {
  const [verTodas, setVerTodas] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);
  const [loaded, setLoaded] = useState<Record<number, boolean>>({});
  const visibles = verTodas ? fotos : fotos.slice(0, 4);

  return (
    <div className="mx-auto max-w-6xl px-6">
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {visibles.map((src, i) => (
          <div key={i} onClick={() => setSelected(i)} className="relative cursor-pointer aspect-square overflow-hidden rounded-xl bg-[#d8c7a8]/40">
            <Image
              src={src}
              alt="The Casa Selva"
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              quality={70}
              priority={i < 4}
              onLoad={() => setLoaded(l => ({ ...l, [i]: true }))}
              ref={(el) => { if (el && el.complete) setLoaded(l => (l[i] ? l : { ...l, [i]: true })); }}
              className={`object-cover transition duration-700 hover:scale-110 ${loaded[i] ? 'opacity-100' : 'opacity-0'}`}
            />
          </div>
        ))}
      </div>

      {fotos.length > 4 && (
        <div className="mt-10 text-center">
          <button
            onClick={() => setVerTodas(!verTodas)}
            className="rounded-full bg-[#7a8b6f] px-12 py-4 text-sm uppercase tracking-widest text-white shadow-lg transition hover:bg-[#697a5f]"
          >
            {verTodas ? "Show less" : "View gallery"}
          </button>
        </div>
      )}

      {selected !== null && (
        <div
          onClick={() => setSelected(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
        >
          <button onClick={(e) => { e.stopPropagation(); setSelected((selected - 1 + visibles.length) % visibles.length); }} className="absolute left-3 text-4xl text-white md:left-8 z-10">‹</button>
          <img src={visibles[selected]} alt="The Casa Selva" className="max-h-[90vh] max-w-[95vw] rounded-lg object-contain" />
          <button onClick={(e) => { e.stopPropagation(); setSelected((selected + 1) % visibles.length); }} className="absolute right-3 text-4xl text-white md:right-8 z-10">›</button>
        </div>
      )}
    </div>
  );
}
