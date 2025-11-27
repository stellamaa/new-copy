import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600']
});

export const metadata = {
  title: 'stella mathioudakis',
  description: 'Portfolio for development, design, art, and music by Stella Mathioudakis.'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}

