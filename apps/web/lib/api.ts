const BASE = process.env.NEXT_PUBLIC_API_URL!;
export const api = {
  experiences: () => fetch(`${BASE}/api/experiences`).then(r => r.json()),
  availability: (q: Record<string,string>) =>
    fetch(`${BASE}/api/availability?` + new URLSearchParams(q)).then(r => r.json()),
  book: (body: unknown) => fetch(`${BASE}/api/bookings`, { method:'POST',
    headers:{'Content-Type':'application/json'}, body: JSON.stringify(body) }).then(r=>r.json()),
  lookup: (reference: string, email: string) => fetch(`${BASE}/api/account/lookup`, { method:'POST',
    headers:{'Content-Type':'application/json'}, body: JSON.stringify({ reference, email }) }).then(r=>r.json()),
};
