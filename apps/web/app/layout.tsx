import './globals.css';
import { Playfair_Display, Jost } from 'next/font/google';
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' });
const jost = Jost({ subsets: ['latin'], variable: '--font-jost' });
export const metadata = {
  title: 'The Casa Selva  Day Wellness Retreat',
  description: 'Un santuario tropical escondido para reconectar contigo.',
  robots: 'index,follow',
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${playfair.variable} ${jost.variable}`}>
      <body className="bg-cream font-body text-ink antialiased">{children}</body>
    </html>
  );
}
