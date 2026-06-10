import Link from "next/link";

export const metadata = {
  title: "Casa Selva · Refugio de Lujo en la Naturaleza",
  description:
    "Una experiencia de hospedaje exclusiva rodeada de naturaleza. Reserva tu estancia en Casa Selva.",
};

export default function HomePage() {
  return (
    <main className="bg-[#f7f3ec] text-[#3a2e22]">
      {/* HERO */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=2000&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 px-6 text-center text-[#f7f3ec]">
          <p className="mb-4 text-sm uppercase tracking-[0.3em] text-[#d8c7a8]">
            Refugio en la naturaleza
          </p>
          <h1 className="font-serif text-5xl leading-tight md:text-7xl">
            Casa Selva
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-[#ece4d6]">
            Un santuario privado donde el lujo se encuentra con lo silvestre.
            Desconéctate del mundo y reconéctate contigo.
          </p>
          <Link
            href="/reservar"
            className="mt-10 inline-block rounded-full bg-[#7a8b6f] px-10 py-4 text-sm uppercase tracking-widest text-white transition hover:bg-[#697a5f]"
          >
            Reservar estancia
          </Link>
        </div>
      </section>

      {/* EXPERIENCIA */}
      <section className="mx-auto max-w-5xl px-6 py-24 text-center">
        <h2 className="font-serif text-4xl">Una experiencia inolvidable</h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-[#5c4f40]">
          Cada detalle de Casa Selva está pensado para envolverte en calma,
          confort y belleza natural. Amaneceres entre la vegetación, noches
          bajo las estrellas y la privacidad absoluta de un refugio diseñado
          para ti.
        </p>
      </section>

      {/* SECCIONES */}
      <section className="grid gap-px bg-[#d8c7a8] md:grid-cols-3">
        {[
          {
            t: "Naturaleza",
            d: "Inmersión total en un entorno verde, vivo y protegido.",
          },
          {
            t: "Privacidad",
            d: "Tu espacio, sólo tuyo. La ubicación exacta se comparte tras confirmar tu reserva.",
          },
          {
            t: "Confort",
            d: "Acabados premium y comodidades de resort en plena selva.",
          },
        ].map((s) => (
          <div key={s.t} className="bg-[#f7f3ec] p-12 text-center">
            <h3 className="font-serif text-2xl">{s.t}</h3>
            <p className="mt-4 text-[#5c4f40]">{s.d}</p>
          </div>
        ))}
      </section>

      {/* CTA */}
      <section className="bg-[#3a2e22] px-6 py-24 text-center text-[#f7f3ec]">
        <h2 className="font-serif text-4xl">¿Listo para tu escape?</h2>
        <p className="mx-auto mt-4 max-w-xl text-[#d8c7a8]">
          Consulta disponibilidad y asegura tus fechas en Casa Selva.
        </p>
        <Link
          href="/reservar"
          className="mt-8 inline-block rounded-full bg-[#7a8b6f] px-10 py-4 text-sm uppercase tracking-widest text-white transition hover:bg-[#697a5f]"
        >
          Ver disponibilidad
        </Link>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#2c231a] px-6 py-12 text-center text-sm text-[#a89b86]">
        <p className="font-serif text-lg text-[#f7f3ec]">Casa Selva</p>
        <p className="mt-2">
          La dirección exacta se comparte de forma privada tras confirmar tu
          reserva.
        </p>
        <p className="mt-4">© {new Date().getFullYear()} Casa Selva. Todos los derechos reservados.</p>
      </footer>
    </main>
  );
}
