import type { Metadata } from 'next';
import { Noto_Sans_JP } from 'next/font/google';
import './globals.css';
import Providers from './providers';
import Navbar from '@/components/navbar';

const noto_sans_jp = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-noto-sans-jp',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Adayroi - Vietnamese news in Japan',
  description:
    'Update japanese sentences to be more polite and suitable for daily conversations with customers.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${noto_sans_jp.className} antialiased`}>
        <Providers>
          <div className="md:container h-screen mx-auto w-full md:max-w-(--breakpoint-md)">
            <Navbar />
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
