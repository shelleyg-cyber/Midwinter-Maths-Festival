import type { Metadata } from 'next';
import { Merriweather } from 'next/font/google';
import './globals.css';

const merriweather = Merriweather({
  subsets: ['latin'],
  weight: ['300', '400', '700', '900'],
  style: ['normal', 'italic'],
  variable: '--font-merriweather',
});

export const metadata: Metadata = {
  title: 'Maths Around Our World — Interactive Map',
  description:
    '2026 Midwinter Maths Festival — a clickable world map of cultural maths challenges for the classroom.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={merriweather.variable}>{children}</body>
    </html>
  );
}
