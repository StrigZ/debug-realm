import { GeistSans } from 'geist/font/sans';
import { type Metadata } from 'next';

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
      <body className="dark overflow-hidden">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
