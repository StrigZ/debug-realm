import { GeistSans } from 'geist/font/sans';
import { type Metadata } from 'next';

import '~/styles/globals.css';
import ReactQueryProvider from '~/utils/ReactQueryProvider';

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
      <body className="container mx-auto bg-slate-950 text-white">
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </body>
    </html>
  );
}
