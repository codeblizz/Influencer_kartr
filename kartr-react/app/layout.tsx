import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Footer from '@/components/layout/footer';
import { Toaster } from '@/components/ui/sonner';
import { Header } from '@/components/layout/header';
import { ThemeProvider } from '@/lib/theme-provider';
import { Sidebar } from '@/components/layout/sidebar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Kartr',
  description:
    'A production-ready Next.js application with modern architecture',
  keywords: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Zustand'],
  viewport: 'width=device-width, initial-scale=1',
  authors: [{ url: 'http://www.github.com/codeblizz', name: 'Collins Maduka' }],
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <div className="min-h-screen bg-background">
            <Header />
            <div className="flex">
              <Sidebar />
              <main className="flex-1 overflow-hidden">{children}</main>
            </div>
            <Footer />
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
