"use client";

import { useState } from "react";

export default function Galeria({ fotos }: { fotos: string[] }) {
  const [verTodas, setVerTodas] = useState(false);
  const visibles = verTodas ? fotos : fotos.slice(0, 4);

  return (
    <div className="mx-auto max-w-6xl px-6">
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {visibles.map((src, i) => (
          <div key={i} className="aspect-square overflow-hidden rounded-xl">
            <img
              src={src}
              alt="The Casa Selva"
              className="h-full w-full object-cover transition duration-700 hover:scale-110"
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
    </div>
  );
}
