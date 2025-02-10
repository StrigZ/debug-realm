import { GeistSans } from 'geist/font/sans';
import { type Metadata } from 'next';

import CartContextProvider from '~/context/CartContextProvider';
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
      <body className="dark overflow-hidden">
        <ReactQueryProvider>
          <CartContextProvider>{children}</CartContextProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
