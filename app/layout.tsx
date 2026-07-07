import type { Metadata } from 'next';
import { Fraunces, Instrument_Sans } from 'next/font/google';
import type { ReactNode } from 'react';
import business from '../data/business.json';
import './globals.css';

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  weight: ['600', '700'],
});

const instrument = Instrument_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: `${business.name} | Manhattan HVAC Contact`,
  description:
    'Phone-first Manhattan HVAC contact page for Cozy Air Conditioning, using supplied business data and real contact paths.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${instrument.variable}`}>
      <body>{children}</body>
    </html>
  );
}
