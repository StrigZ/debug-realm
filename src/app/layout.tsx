import { GeistSans } from 'geist/font/sans';
import { type Metadata } from 'next';

import Header from '~/components/Header';
import Providers from '~/providers';
import '~/styles/globals.css';

export const metadata: Metadata = {
  title: 'Debug Realm',
  description: 'Browse and purchase games with ease!',
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <Providers>
          <main className="flex h-screen flex-col gap-8 bg-background text-foreground">
            <Header />
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
