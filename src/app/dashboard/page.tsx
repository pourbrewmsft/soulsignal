import Link from 'next/link'
import { Heart, Activity, Brain, Settings } from 'lucide-react'

export default function DashboardPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
          <p className="text-slate-600 mt-1">Welcome to your biometric meditation companion</p>
        </div>
        <Link href="/devices" className="btn btn-secondary">
          <Settings className="w-4 h-4 mr-2" />
          Manage Devices
        </Link>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="card">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center mr-3">
              <Heart className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-slate-600">Heart Rate</p>
              <p className="text-2xl font-bold text-slate-900">-- bpm</p>
            </div>
          </div>
          <p className="text-sm text-slate-500">No recent data</p>
        </div>

        <div className="card">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
              <Activity className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-slate-600">HRV</p>
              <p className="text-2xl font-bold text-slate-900">-- ms</p>
            </div>
          </div>
          <p className="text-sm text-slate-500">No recent data</p>
        </div>

        <div className="card">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
              <Brain className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-slate-600">EEG State</p>
              <p className="text-2xl font-bold text-slate-900">--</p>
            </div>
          </div>
          <p className="text-sm text-slate-500">No recent data</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-xl font-semibold mb-4">Recent Sessions</h3>
          <div className="space-y-3">
            <p className="text-slate-500 text-center py-8">No sessions yet</p>
            <Link href="/prayer-mode" className="btn btn-primary w-full">
              Start Prayer Mode
            </Link>
          </div>
        </div>

        <div className="card">
          <h3 className="text-xl font-semibold mb-4">Connected Devices</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2">
              <span className="text-slate-600">Oura Ring</span>
              <span className="text-sm text-red-600">Not connected</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-slate-600">Muse EEG</span>
              <span className="text-sm text-red-600">Not connected</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-slate-600">Apple Health</span>
              <span className="text-sm text-red-600">No data uploaded</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-slate-600">Garmin</span>
              <span className="text-sm text-yellow-600">Mock data available</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}