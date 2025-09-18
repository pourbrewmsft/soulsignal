import type { Metadata } from 'next'
import './globals.css'
import Navigation from '@/components/Navigation'

export const metadata: Metadata = {
  title: 'SoulSignal - Biometric Meditation & Prayer Companion',
  description: 'Aggregate biometric data from Oura, Garmin, Apple Health, and Muse EEG for enhanced meditation and prayer experiences.',
  keywords: ['meditation', 'prayer', 'biometric', 'health', 'mindfulness'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-sans">
        <Navigation />
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  )
}