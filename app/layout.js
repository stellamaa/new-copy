import './globals.css';

export const metadata = {
  title: 'stella mathioudakis',
  description: 'Portfolio for development, design, art, and music by Stella Mathioudakis.',
  icons: {
    icon: '/icon.png',
    apple: '/icon.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

