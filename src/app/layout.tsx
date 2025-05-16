import type { Metadata } from 'next';
// import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

export const metadata: Metadata = {
  title: 'Maestro',
  description: 'Create a playlist out of your tumblr blog',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className='flex-wrap align-center justify-center'>
        {children}
      </body>
    </html>
  );
}
