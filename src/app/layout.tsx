import type { Metadata } from 'next';
import './globals.css';
import { AppProvider } from '@/context/AppContext';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CartDrawer } from '@/components/layout/CartDrawer';
import { SearchModal } from '@/components/layout/SearchModal';
import { ToastContainer } from '@/components/layout/ToastContainer';
import { SITE_CONFIG } from '@/data/siteConfig';

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: `${SITE_CONFIG.name} — Fresh Handcrafted Cakes`,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  keywords: ['cakes', 'bakery', 'birthday cake', 'artisan cakes', 'chocolate cake', 'cheesecake', 'chilled delivery'],
  authors: [{ name: SITE_CONFIG.name }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full dark" data-scroll-behavior="smooth">
      <body className="min-h-full flex flex-col bg-[#000000] text-[#FFFFFF] antialiased selection:bg-[#BC0202] selection:text-white">
        <AppProvider>
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
          <CartDrawer />
          <SearchModal />
          <ToastContainer />
        </AppProvider>
      </body>
    </html>
  );
}
