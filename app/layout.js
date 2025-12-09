import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600']
});

export const metadata = {
  title: 'stella mathioudakis',
  description: 'Portfolio for development, design, art, and music by Stella Mathioudakis.',
  icons: {
    icon: '/assets/S.png',
    shortcut: '/assets/S.png',
    apple: '/assets/S.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const saved = localStorage.getItem('theme');
                  // Only apply dark mode if explicitly saved as 'dark'
                  // Otherwise, default to light mode (no dark class)
                  if (saved === 'dark') {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {
                  // If localStorage fails, ensure light mode (no dark class)
                  document.documentElement.classList.remove('dark');
                }
              })();
            `,
          }}
        />
        {children}
      </body>
    </html>
  );
}

