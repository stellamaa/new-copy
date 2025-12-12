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
  other: {
    'format-detection': 'telephone=no, email=no, address=no',
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
                if (typeof document !== 'undefined') {
                  var meta = document.querySelector('meta[name="format-detection"]');
                  if (!meta) {
                    meta = document.createElement('meta');
                    meta.name = 'format-detection';
                    meta.content = 'telephone=no, email=no, address=no';
                    document.getElementsByTagName('head')[0].appendChild(meta);
                  }
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

