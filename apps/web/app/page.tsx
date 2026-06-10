import Link from "next/link";

export const metadata = {
  title: "Casa Selva · Refugio de Lujo en la Naturaleza",
  description:
    "Una experiencia de hospedaje exclusiva rodeada de naturaleza. Reserva tu estancia en Casa Selva.",
};

const experiencias = [
  {
    titulo: "Suite del Dosel",
    img: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=80",
    desc: "Una habitación elevada entre las copas, con vistas abiertas a la selva y luz natural todo el día.",
  },
  {
    titulo: "Baño Sonoro Privado",
    img: "https://images.unsplash.com/photo-1545389336-cf090694435e?auto=format&fit=crop&w=1200&q=80",
    desc: "Una experiencia de relajación profunda guiada, diseñada para reconectar cuerpo y mente.",
  },
  {
    titulo: "Inmersión en Agua",
    img: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80",
    desc: "Tina cálida rodeada de naturaleza, con pétalos y silencio. Tu pausa perfecta.",
  },
];

const galeria = [
  "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=900&q=80",
];

const amenidades = [
  "Wi-Fi de alta velocidad",
  "Desayuno artesanal",
  "Senderos privados",
  "Spa & bienestar",
  "Estacionamiento",
  "Check-in flexible",
];

export default function HomePage() {
  return (
    <main className="bg-[#f7f3ec] text-[#3a2e22]">
      {/* NAVBAR */}
      <header className="fixed top-0 z-50 w-full backdrop-blur-md bg-[#3a2e22]/30">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <span className="font-serif text-xl text-[#f7f3ec]">Casa Selva</span>
          <div className="hidden gap-8 text-sm uppercase tracking-widest text-[#f7f3ec] md:flex">
            <a href="#experiencias" className="transition hover:text-[#d8c7a8]">Experiencias</a>
            <a href="#galeria" className="transition hover:text-[#d8c7a8]">Galería</a>
            <a href="#amenidades" className="transition hover:text-[#d8c7a8]">Amenidades</a>
          </div>
          <Link
            href="/reservar"
            className="rounded-full border border-[#f7f3ec]/60 px-6 py-2 text-xs uppercase tracking-widest text-[#f7f3ec] transition hover:bg-[#f7f3ec] hover:text-[#3a2e22]"
          >
            Reservar
          </Link>
        </nav>
      </header>

      {/* HERO */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 scale-105 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=2000&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-[#3a2e22]/70" />
        <div className="relative z-10 px-6 text-center text-[#f7f3ec]">
          <p className="mb-4 text-sm uppercase tracking-[0.4em] text-[#d8c7a8]">
            Refugio en la naturaleza
          </p>
          <h1 className="font-serif text-6xl leading-tight md:text-8xl">Casa Selva</h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-[#ece4d6]">
            Un santuario privado donde el lujo se encuentra con lo silvestre.
            Desconéctate del mundo y reconéctate contigo.
          </p>
          <Link
            href="/reservar"
            className="mt-10 inline-block rounded-full bg-[#7a8b6f] px-12 py-4 text-sm uppercase tracking-widest text-white shadow-lg transition hover:bg-[#697a5f] hover:shadow-xl"
          >
            Reservar estancia
          </Link>
        </div>
        <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-xs uppercase tracking-widest text-[#f7f3ec]/70">
          Desliza para descubrir
        </div>
      </section>

      {/* INTRO */}
      <section className="mx-auto max-w-3xl px-6 py-28 text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-[#7a8b6f]">Bienvenido</p>
        <h2 className="mt-4 font-serif text-4xl md:text-5xl">Una experiencia inolvidable</h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-[#5c4f40]">
          Cada detalle de Casa Selva está pensado para envolverte en calma,
          confort y belleza natural. Amaneceres entre la vegetación, noches bajo
          las estrellas y la privacidad absoluta de un refugio diseñado para ti.
        </p>
      </section>

      {/* EXPERIENCIAS (tarjetas con foto) */}
      <section id="experiencias" className="mx-auto max-w-6xl px-6 pb-28">
        <h2 className="mb-12 text-center font-serif text-4xl md:text-5xl">Experiencias</h2>
        <div className="grid gap-8 md:grid-cols-3">
          {experiencias.map((e) => (
            <div key={e.titulo} className="group overflow-hidden rounded-2xl bg-white shadow-sm transition hover:shadow-xl">
              <div className="h-64 overflow-hidden">
                <img
                  src={e.img}
                  alt={e.titulo}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                />
              </div>
              <div className="p-8">
                <h3 className="font-serif text-2xl">{e.titulo}</h3>
                <p className="mt-3 text-[#5c4f40]">{e.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* GALERIA */}
      <section id="galeria" className="bg-[#ece4d6] py-28">
        <h2 className="mb-12 text-center font-serif text-4xl md:text-5xl">Galería</h2>
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-3 px-6 md:grid-cols-4">
          {galeria.map((src, i) => (
            <div key={i} className="aspect-square overflow-hidden rounded-xl">
              <img src={src} alt={"Casa Selva " + (i + 1)} className="h-full w-full object-cover transition duration-700 hover:scale-110" />
            </div>
          ))}
        </div>
      </section>

      {/* AMENIDADES */}
      <section id="amenidades" className="mx-auto max-w-5xl px-6 py-28 text-center">
        <h2 className="mb-12 font-serif text-4xl md:text-5xl">Amenidades</h2>
        <div className="grid grid-cols-2 gap-6 md:grid-cols-3">
          {amenidades.map((a) => (
            <div key={a} className="rounded-xl border border-[#d8c7a8] bg-white/50 px-6 py-8 text-[#5c4f40]">
              {a}
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIO */}
      <section className="bg-[#7a8b6f] px-6 py-28 text-center text-white">
        <p className="mx-auto max-w-3xl font-serif text-2xl leading-relaxed md:text-3xl">
          “El lugar más sereno en el que nos hemos hospedado. Despertar entre
          árboles y silencio fue exactamente lo que necesitábamos.”
        </p>
        <p className="mt-6 text-sm uppercase tracking-widest text-[#e6ecdf]">— Huéspedes de Casa Selva</p>
      </section>

      {/* CTA */}
      <section className="bg-[#3a2e22] px-6 py-28 text-center text-[#f7f3ec]">
        <h2 className="font-serif text-4xl md:text-5xl">¿Listo para tu escape?</h2>
        <p className="mx-auto mt-4 max-w-xl text-[#d8c7a8]">
          Consulta disponibilidad y asegura tus fechas en Casa Selva.
        </p>
        <Link
          href="/reservar"
          className="mt-8 inline-block rounded-full bg-[#7a8b6f] px-12 py-4 text-sm uppercase tracking-widest text-white transition hover:bg-[#697a5f]"
        >
          Ver disponibilidad
        </Link>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#2c231a] px-6 py-16 text-center text-sm text-[#a89b86]">
        <p className="font-serif text-2xl text-[#f7f3ec]">Casa Selva</p>
        <p className="mt-3 max-w-md mx-auto">
          La dirección exacta se comparte de forma privada tras confirmar tu reserva.
        </p>
        <div className="mt-6 flex justify-center gap-8 text-xs uppercase tracking-widest">
          <a href="#experiencias" className="hover:text-[#f7f3ec]">Experiencias</a>
          <a href="#galeria" className="hover:text-[#f7f3ec]">Galería</a>
          <Link href="/reservar" className="hover:text-[#f7f3ec]">Reservar</Link>
        </div>
        <p className="mt-8">© {new Date().getFullYear()} Casa Selva. Todos los derechos reservados.</p>
      </footer>
    </main>
  );
}
