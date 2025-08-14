'use client';
import { AuthProvider } from './contexts/AuthContext';
import { HeroUIProvider, ToastProvider } from '@heroui/react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <HeroUIProvider>
        <ToastProvider />
        <NextThemesProvider attribute="class" defaultTheme="dark">
          {children}
        </NextThemesProvider>
      </HeroUIProvider>
    </AuthProvider>
  );
}
