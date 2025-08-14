'use client'
import { AuthProvider } from './contexts/AuthContext'
import {HeroUIProvider, ToastProvider} from '@heroui/react'

export function Providers({children}: { children: React.ReactNode }) {
  return (
    <AuthProvider>
    <HeroUIProvider>
      <ToastProvider/>
      {children}
    </HeroUIProvider>
    </AuthProvider>
  )
}