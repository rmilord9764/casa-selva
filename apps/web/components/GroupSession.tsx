import Link from "next/link";

export default function GroupSession() {
  return (
    <div className="mt-6 border-t border-[#e2d5bb] pt-6">
      <Link
        href="/experiencia-grupal"
        className="mx-auto flex w-fit items-center gap-2 rounded-full border border-[#c9b892] bg-[#f3ede1] px-6 py-2.5 text-xs font-semibold uppercase tracking-widest text-[#7a8b6f] transition hover:bg-[#e9e0cf]"
      >
        <span>✦</span>
        Ver fechas de grupo · See group dates
      </Link>
    </div>
  );
}
