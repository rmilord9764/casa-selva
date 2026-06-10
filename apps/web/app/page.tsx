import Link from "next/link";

export const metadata = {
  title: "The Casa Selva · Day Wellness Retreat",
  description:
    "A hidden tropical sanctuary in Fort Lauderdale for peace, reconnection, and a deeper reset.",
};

const experiencia = [
  "Welcome tea ceremony",
  "Intention setting + aromatherapy",
  "Guided breathwork",
  "Meditation + somatic work",
  "Yoga Nidra (deep relaxation)",
  "Immersive sound healing",
  "Water Sound healing (private optional for +$50)",
  "Integration time + refreshments",
];

const formatos = [
  { titulo: "Join a group session", detalle: "Up to 8 adults | 2-3 hours | $150" },
  { titulo: "Private Experience", detalle: "1 adult | 2-3 hours | $350 | additional adult +$80" },
  { titulo: "Private Group", detalle: "Up to 8 adults | 2-3 hours | inquire" },
];

const servicios = [
  {
    titulo: "Private Sound Bath",
    precio: "1 adult | 1 hour $160 | $60 per additional adult",
    img: "https://images.unsplash.com/photo-1591291621164-2c6367723315?auto=format&fit=crop&w=1200&q=80",
    items: ["Personalized intention setting", "Guided meditation + breathwork", "Somatic relaxation techniques", "Immersive sound healing (focused on you)"],
  },
  {
    titulo: "Group Sound Bath",
    precio: "Join a class up to 8 adults | 1 hour $80pp",
    img: "https://images.unsplash.com/photo-1600618528240-fb9fc964b853?auto=format&fit=crop&w=1200&q=80",
    items: ["Guided meditation to arrive", "Gentle breathwork", "Intention setting", "Immersive sound healing with bowls"],
  },
  {
    titulo: "Water Sound Bath",
    precio: "1 adult | 1 hour $230 | +$50 additional adult",
    img: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80",
    items: ["Warm water immersion (tub)", "Guided relaxation or meditation", "Sound healing with bowls around the water", "Deep nervous system reset", "Enhanced emotional release + grounding"],
  },
];

const galeria = [
  "https://images.unsplash.com/photo-1545389336-cf090694435e?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1604881991720-f91add269bed?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1531971589569-0d9370cbe1e5?auto=format&fit=crop&w=900&q=80",
];

const testimonios = [
  { texto: "A hidden corner of the retreat where nature surrounds you. Enjoy the beauty of the trees and the peaceful outdoor setting that makes Casa Selva feel like a private sanctuary.", autor: "Adriana (wellness guest)" },
  { texto: "The sound healing experience was incredibly grounding and beautiful. The space itself is magical - every detail feels intentional and calming.", autor: "Frank (retreat participant)" },
  { texto: "A hidden sanctuary in the middle of the city. Casa Selva is unlike anything else in South Florida - peaceful, soulful, and unforgettable.", autor: "Jennifer (Private event guest)" },
];

export default function HomePage() {
  return (
    <main className="bg-[#f7f3ec] text-[#3a2e22]">
      <header className="fixed top-0 z-50 w-full backdrop-blur-md bg-[#3a2e22]/30">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <span className="font-serif text-xl text-[#f7f3ec]">The Casa Selva</span>
          <div className="hidden gap-8 text-sm uppercase tracking-widest text-[#f7f3ec] md:flex">
            <a href="#experiencia" className="transition hover:text-[#d8c7a8]">Experience</a>
            <a href="#servicios" className="transition hover:text-[#d8c7a8]">Services</a>
            <a href="#galeria" className="transition hover:text-[#d8c7a8]">Gallery</a>
            <a href="#contacto" className="transition hover:text-[#d8c7a8]">Contact</a>
          </div>
          <Link href="/reservar" className="rounded-full border border-[#f7f3ec]/60 px-6 py-2 text-xs uppercase tracking-widest text-[#f7f3ec] transition hover:bg-[#f7f3ec] hover:text-[#3a2e22]">Book now</Link>
        </nav>
      </header>

      <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
        <div className="absolute inset-0 scale-105 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=2000&q=80')" }} />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-[#3a2e22]/70" />
        <div className="relative z-10 px-6 text-center text-[#f7f3ec]">
          <p className="mb-4 text-sm uppercase tracking-[0.4em] text-[#d8c7a8]">Welcome to</p>
          <h1 className="font-serif text-5xl leading-tight md:text-7xl">The Casa Selva</h1>
          <p className="mt-4 text-lg uppercase tracking-[0.3em] text-[#ece4d6]">Day Wellness Retreat</p>
          <Link href="/reservar" className="mt-10 inline-block rounded-full bg-[#7a8b6f] px-12 py-4 text-sm uppercase tracking-widest text-white shadow-lg transition hover:bg-[#697a5f]">Learn more</Link>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-28 text-center">
        <h2 className="font-serif text-4xl md:text-5xl">Remind your body what it can do by itself.</h2>
        <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-[#5c4f40]">The Casa Selva is a hidden tropical sanctuary in Fort Lauderdale created for those seeking peace, reconnection, and a deeper reset.</p>
        <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-[#5c4f40]">Surrounded by nature, our space blends sound bath, guided meditation, breathwork, Yoga Nidra, grounding rituals, aromatherapy, and intentional rest.</p>
      </section>

      <section id="experiencia" className="bg-[#ece4d6] py-28">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="font-serif text-4xl md:text-5xl">The Casa Selva Experience</h2>
          <ul className="mx-auto mt-10 grid max-w-2xl gap-4 text-left md:grid-cols-2">
            {experiencia.map((item) => (
              <li key={item} className="flex items-start gap-3 text-[#5c4f40]"><span className="mt-1 text-[#7a8b6f]">+</span>{item}</li>
            ))}
          </ul>
          <p className="mx-auto mt-12 max-w-2xl text-lg leading-relaxed text-[#5c4f40]">A private, immersive reset in a hidden sanctuary. Step into a deeply curated experience designed to help you disconnect and reconnect with yourself.</p>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {formatos.map((f) => (
              <div key={f.titulo} className="rounded-xl border border-[#d8c7a8] bg-white/60 p-6">
                <h3 className="font-serif text-xl">{f.titulo}</h3>
                <p className="mt-2 text-sm text-[#5c4f40]">{f.detalle}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-sm italic text-[#7a6c58]">Food add-ons available.</p>
        </div>
      </section>

      <section id="servicios" className="mx-auto max-w-6xl px-6 py-28">
        <h2 className="mb-12 text-center font-serif text-4xl md:text-5xl">Individual Services</h2>
        <div className="grid gap-8 md:grid-cols-3">
          {servicios.map((s) => (
            <div key={s.titulo} className="group overflow-hidden rounded-2xl bg-white shadow-sm transition hover:shadow-xl">
              <div className="h-64 overflow-hidden">
                <img src={s.img} alt={s.titulo} className="h-full w-full object-cover transition duration-700 group-hover:scale-110" />
              </div>
              <div className="p-8">
                <h3 className="font-serif text-2xl">{s.titulo}</h3>
                <p className="mt-2 text-sm font-medium text-[#7a8b6f]">{s.precio}</p>
                <ul className="mt-4 space-y-2 text-sm text-[#5c4f40]">
                  {s.items.map((it) => (<li key={it} className="flex gap-2"><span className="text-[#7a8b6f]">-</span>{it}</li>))}
                </ul>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-10 text-center text-sm italic text-[#7a6c58]">Private events and corporate retreats available. Pricing upon request.</p>
      </section>

      <section id="galeria" className="bg-[#ece4d6] py-28">
        <h2 className="mb-12 text-center font-serif text-4xl md:text-5xl">Gallery</h2>
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-3 px-6 md:grid-cols-4">
          {galeria.map((src, i) => (
            <div key={i} className="aspect-square overflow-hidden rounded-xl">
              <img src={src} alt="The Casa Selva" className="h-full w-full object-cover transition duration-700 hover:scale-110" />
            </div>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden py-32">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1600618528240-fb9fc964b853?auto=format&fit=crop&w=2000&q=80')" }} />
        <div className="absolute inset-0 bg-[#3a2e22]/70" />
        <div className="relative z-10 mx-auto max-w-6xl px-6">
          <h2 className="mb-16 text-center font-serif text-4xl text-[#f7f3ec] md:text-5xl">Testimonies</h2>
          <div className="grid gap-12 md:grid-cols-3">
            {testimonios.map((t) => (
              <div key={t.autor} className="text-[#f7f3ec]">
                <span className="font-serif text-6xl leading-none text-[#d8c7a8]">&ldquo;</span>
                <p className="mt-2 text-[15px] leading-relaxed">{t.texto}</p>
                <p className="mt-6 text-sm font-bold italic">- {t.autor}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contacto" className="bg-[#3a2e22] px-6 py-28 text-center text-[#f7f3ec]">
        <h2 className="font-serif text-4xl md:text-5xl">Reservations</h2>
        <div className="mx-auto mt-10 grid max-w-3xl gap-8 md:grid-cols-2">
          <div>
            <h3 className="text-sm uppercase tracking-widest text-[#d8c7a8]">Office Hours</h3>
            <p className="mt-3">Monday to Friday 9:00 am - 6:00 pm</p>
            <p>Saturday and Sunday 9:00 am - 12:00 noon</p>
          </div>
          <div>
            <h3 className="text-sm uppercase tracking-widest text-[#d8c7a8]">Contact</h3>
            <p className="mt-3">Plantation, Florida 33325</p>
            <p className="text-[#d8c7a8]">(Full address shared after booking)</p>
            <p className="mt-2">+1 (305) 916-9438</p>
            <p>thecasaselva@gmail.com</p>
          </div>
        </div>
        <Link href="/reservar" className="mt-12 inline-block rounded-full bg-[#7a8b6f] px-12 py-4 text-sm uppercase tracking-widest text-white transition hover:bg-[#697a5f]">Book your reset</Link>
      </section>

      <footer className="bg-[#2c231a] px-6 py-12 text-center text-sm text-[#a89b86]">
        <p className="font-serif text-2xl text-[#f7f3ec]">The Casa Selva</p>
        <p className="mt-3">A hidden tropical sanctuary - Fort Lauderdale, Florida</p>
        <p className="mt-6">(c) 2026 The Casa Selva. All rights reserved.</p>
      </footer>
    </main>
  );
}
