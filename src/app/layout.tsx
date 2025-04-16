import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

export const metadata: Metadata = {
  title: 'HPP Test'
};

const inter = Inter({ subsets: ['latin'] });

const RootLayout = ({
  children
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex h-screen w-full items-start justify-center pt-36">{children}</div>
      </body>
    </html>
  );
};

export default RootLayout;
