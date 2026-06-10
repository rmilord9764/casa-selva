import type { MetadataRoute } from 'next';
export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://thecasaselva.com';
  return ['', '/reservar', '/mi-reserva'].map(p => ({ url: base + p, lastModified: new Date(), changeFrequency: 'weekly', priority: p===''?1:0.8 }));
}
