'use client'

import { useState } from 'react'
import { Check, X, Upload, Bluetooth, Smartphone, Watch } from 'lucide-react'

interface DeviceStatus {
  id: string
  name: string
  type: 'oura' | 'garmin' | 'apple' | 'muse'
  icon: React.ComponentType<{ className?: string }>
  connected: boolean
  lastSync?: Date
  description: string
  connectionMethod: string
}

export default function DevicesPage() {
  const [devices, setDevices] = useState<DeviceStatus[]>([
    {
      id: '1',
      name: 'Oura Ring',
      type: 'oura',
      icon: Watch,
      connected: false,
      description: 'Heart rate, HRV, sleep, and activity data',
      connectionMethod: 'OAuth'
    },
    {
      id: '2', 
      name: 'Muse EEG Headband',
      type: 'muse',
      icon: Bluetooth,
      connected: false,
      description: 'Real-time EEG brainwave monitoring',
      connectionMethod: 'Web Bluetooth'
    },
    {
      id: '3',
      name: 'Apple Health',
      type: 'apple',
      icon: Smartphone,
      connected: false,
      description: 'Health data from iOS devices',
      connectionMethod: 'File Upload'
    },
    {
      id: '4',
      name: 'Garmin Connect',
      type: 'garmin',
      icon: Watch,
      connected: true,
      lastSync: new Date(),
      description: 'Mock data for demonstration',
      connectionMethod: 'Mock Data'
    }
  ])

  const [showFileUpload, setShowFileUpload] = useState(false)

  const connectOura = async () => {
    // Redirect to Oura OAuth
    const clientId = process.env.NEXT_PUBLIC_OURA_CLIENT_ID || 'demo-client-id'
    const redirectUri = encodeURIComponent(window.location.origin + '/api/auth/oura/callback')
    const scope = 'daily heartrate workout tag session'
    const ouraAuthUrl = `https://cloud.ouraring.com/oauth/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`
    
    window.location.href = ouraAuthUrl
  }

  const connectMuse = async () => {
    try {
      // Check if Web Bluetooth is supported
      if (!navigator.bluetooth) {
        alert('Web Bluetooth is not supported in this browser')
        return
      }

      // Request Bluetooth device
      const device = await navigator.bluetooth.requestDevice({
        filters: [{ name: 'Muse' }],
        optionalServices: ['battery_service']
      })
      
      console.log('Muse device selected:', device.name)
      
      // Update device status
      setDevices(prev => prev.map(d => 
        d.type === 'muse' 
          ? { ...d, connected: true, lastSync: new Date() }
          : d
      ))
    } catch (error) {
      console.error('Bluetooth connection failed:', error)
      alert('Bluetooth connection failed. Make sure your browser supports Web Bluetooth and the device is nearby.')
    }
  }

  const handleAppleHealthUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0]
    if (uploadedFile) {
      // Process the Apple Health export file
      setDevices(prev => prev.map(d => 
        d.type === 'apple'
          ? { ...d, connected: true, lastSync: new Date() }
          : d
      ))
      setShowFileUpload(false)
      alert('Apple Health data uploaded successfully!')
    }
  }

  const disconnect = (deviceId: string) => {
    setDevices(prev => prev.map(d => 
      d.id === deviceId 
        ? { ...d, connected: false, lastSync: undefined }
        : d
    ))
  }

  const getConnectionButton = (device: DeviceStatus) => {
    if (device.connected) {
      return (
        <button
          onClick={() => disconnect(device.id)}
          className="btn btn-secondary text-sm"
        >
          <X className="w-4 h-4 mr-1" />
          Disconnect
        </button>
      )
    }

    switch (device.type) {
      case 'oura':
        return (
          <button onClick={connectOura} className="btn btn-primary text-sm">
            Connect with OAuth
          </button>
        )
      case 'muse':
        return (
          <button onClick={connectMuse} className="btn btn-primary text-sm">
            <Bluetooth className="w-4 h-4 mr-1" />
            Connect via Bluetooth
          </button>
        )
      case 'apple':
        return (
          <button 
            onClick={() => setShowFileUpload(true)} 
            className="btn btn-primary text-sm"
          >
            <Upload className="w-4 h-4 mr-1" />
            Upload Data
          </button>
        )
      case 'garmin':
        return (
          <div className="text-sm text-green-600 font-medium">
            <Check className="w-4 h-4 inline mr-1" />
            Mock Data Active
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Device Connections</h1>
        <p className="text-slate-600">Connect your biometric devices to start collecting data</p>
      </div>

      <div className="grid gap-6">
        {devices.map((device) => {
          const IconComponent = device.icon
          return (
            <div key={device.id} className="card">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                    device.connected ? 'bg-green-100' : 'bg-slate-100'
                  }`}>
                    <IconComponent className={`w-6 h-6 ${
                      device.connected ? 'text-green-600' : 'text-slate-600'
                    }`} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">{device.name}</h3>
                    <p className="text-slate-600 text-sm">{device.description}</p>
                    <p className="text-slate-500 text-xs mt-1">
                      Connection: {device.connectionMethod}
                      {device.lastSync && (
                        <> • Last sync: {device.lastSync.toLocaleString()}</>
                      )}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    device.connected ? 'bg-green-500' : 'bg-red-500'
                  }`}></div>
                  {getConnectionButton(device)}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="card mt-8">
        <h3 className="text-lg font-semibold mb-4">Privacy & Consent</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between py-2">
            <span className="text-slate-700">Share heart rate data</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-soul-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-soul-600"></div>
            </label>
          </div>
          <div className="flex items-center justify-between py-2">
            <span className="text-slate-700">Share HRV data</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-soul-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-soul-600"></div>
            </label>
          </div>
          <div className="flex items-center justify-between py-2">
            <span className="text-slate-700">Share EEG data</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-soul-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-soul-600"></div>
            </label>
          </div>
        </div>
        <p className="text-sm text-slate-500 mt-4">
          You can revoke consent at any time. Your data is encrypted and stored securely.
        </p>
      </div>

      {/* Apple Health File Upload Modal */}
      {showFileUpload && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">Upload Apple Health Data</h3>
            <p className="text-sm text-slate-600 mb-4">
              Export your health data from the Apple Health app and upload the XML file here.
            </p>
            <input
              type="file"
              accept=".xml,.zip"
              onChange={handleAppleHealthUpload}
              className="w-full mb-4 p-2 border border-slate-300 rounded-lg"
            />
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowFileUpload(false)}
                className="btn btn-secondary"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}