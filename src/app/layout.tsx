import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import { Providers } from '@/providers';
import NavigationBar from '@/components/NavigationBar';
import './globals.css';
import Footer from '@/components/Footer';

const roboto = Roboto({
  subsets: ['latin'],
});


export const metadata: Metadata = {
  title: 'JobsTracker | HomePage',
  description: 'Web App to track job applications',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${roboto.className} antialiased`}>
        <Providers>
          <div className="flex flex-col min-h-screen">
            <NavigationBar />
            <main className="flex-1 w-full">
              <div className="max-w-6xl mx-auto p-4 lg:p-6">{children}</div>
            </main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
