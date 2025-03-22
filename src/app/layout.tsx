import type { Metadata } from 'next';
import { Roboto_Mono } from 'next/font/google';
import './globals.css';
import Providers from './providers';
import Navbar from '@/components/navbar';

export const roboto_mono = Roboto_Mono({
  subsets: ['latin'],
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
      <body className={`${roboto_mono.className} antialiased`}>
        <Providers>
          <div className="md:container h-screen mx-auto w-full md:max-w-screen-md">
            <Navbar />
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
