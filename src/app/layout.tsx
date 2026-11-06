import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {
  title: 'Kelkel — Nosso Infinito ♡',
  description: 'Um universo inteiro, criado para você. Feliz aniversário, minha princesa.',
  icons: { icon: '/icon.svg' },
  robots: { index: false, follow: false },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><body>{children}</body></html>;
}
