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
                  // Randomly choose between light and dark mode on each render
                  const isDark = Math.random() >= 0.5;
                  if (isDark) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {
                  // If there's an error, default to light mode
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

