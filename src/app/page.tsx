import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-16">
        <h1 className="text-6xl font-bold text-slate-900 mb-4">
          Soul<span className="text-soul-600">Signal</span>
        </h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
          Your biometric meditation and prayer companion. Aggregate data from Oura, Garmin, 
          Apple Health, and Muse EEG for enhanced spiritual experiences.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-12">
        <div className="card text-center">
          <div className="w-12 h-12 bg-soul-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
            <svg className="w-6 h-6 text-soul-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-2">Data Integration</h3>
          <p className="text-slate-600">
            Connect Oura Ring, Garmin, Apple Health, and Muse EEG devices
          </p>
        </div>

        <div className="card text-center">
          <div className="w-12 h-12 bg-soul-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
            <svg className="w-6 h-6 text-soul-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-2">Prayer Mode</h3>
          <p className="text-slate-600">
            Live HR/HRV/EEG monitoring during meditation and prayer sessions
          </p>
        </div>

        <div className="card text-center">
          <div className="w-12 h-12 bg-soul-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
            <svg className="w-6 h-6 text-soul-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-2">Privacy First</h3>
          <p className="text-slate-600">
            Your biometric data stays secure with full consent controls
          </p>
        </div>
      </div>

      <div className="text-center space-x-4">
        <Link href="/dashboard" className="btn btn-primary">
          Get Started
        </Link>
        <Link href="/about" className="btn btn-secondary">
          Learn More
        </Link>
      </div>
    </div>
  )
}