import type { Metadata } from 'next';
import { DM_Sans } from 'next/font/google';
import './globals.css';

const dm = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm',
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'Movieletters — Discover what to watch next',
  description: 'A modern movie discovery app built with Next.js and TMDB',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${dm.variable} font-body min-h-screen flex flex-col bg-void text-snow relative`}>
        {children}
        <footer className="text-center py-6 border-t border-rim mt-auto">
          <p className="font-body text-mist text-[0.8rem]">Built for Jeevan — Aarohi Sharma</p>
        </footer>
      </body>
    </html>
  );
}
