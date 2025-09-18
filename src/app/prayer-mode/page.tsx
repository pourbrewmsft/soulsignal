'use client'

import { useState, useEffect } from 'react'
import { Play, Pause, Square, Plus } from 'lucide-react'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

interface BiometricData {
  timestamp: Date
  heartRate: number
  hrv: number
  eegFocus: number
}

export default function PrayerModePage() {
  const [isActive, setIsActive] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [duration, setDuration] = useState(0)
  const [data, setData] = useState<BiometricData[]>([])
  const [distractions, setDistractions] = useState<{ timestamp: Date; type: string; note?: string }[]>([])
  const [notes, setNotes] = useState('')

  // Simulate real-time data
  useEffect(() => {
    if (!isActive || isPaused) return

    const interval = setInterval(() => {
      const newReading: BiometricData = {
        timestamp: new Date(),
        heartRate: 60 + Math.random() * 40, // 60-100 bpm
        hrv: 30 + Math.random() * 20, // 30-50 ms
        eegFocus: Math.random() * 100 // 0-100%
      }
      
      setData(prev => [...prev.slice(-19), newReading]) // Keep last 20 readings
      setDuration(prev => prev + 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [isActive, isPaused])

  const startSession = () => {
    setIsActive(true)
    setIsPaused(false)
    setDuration(0)
    setData([])
    setDistractions([])
  }

  const pauseSession = () => {
    setIsPaused(!isPaused)
  }

  const stopSession = () => {
    setIsActive(false)
    setIsPaused(false)
    // Here you would save the session to the database
  }

  const addDistraction = (type: string) => {
    setDistractions(prev => [...prev, {
      timestamp: new Date(),
      type,
      note: ''
    }])
  }

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const chartData = {
    labels: data.map(d => d.timestamp.toLocaleTimeString()),
    datasets: [
      {
        label: 'Heart Rate (BPM)',
        data: data.map(d => d.heartRate),
        borderColor: 'rgb(239, 68, 68)',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        yAxisID: 'y',
      },
      {
        label: 'HRV (ms)',
        data: data.map(d => d.hrv),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        yAxisID: 'y1',
      },
      {
        label: 'Focus (%)',
        data: data.map(d => d.eegFocus),
        borderColor: 'rgb(139, 92, 246)',
        backgroundColor: 'rgba(139, 92, 246, 0.1)',
        yAxisID: 'y2',
      },
    ],
  }

  const chartOptions: ChartOptions<'line'> = {
    responsive: true,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: 'Time'
        }
      },
      y: {
        type: 'linear' as const,
        display: true,
        position: 'left' as const,
        title: {
          display: true,
          text: 'Heart Rate (BPM)'
        }
      },
      y1: {
        type: 'linear' as const,
        display: true,
        position: 'right' as const,
        title: {
          display: true,
          text: 'HRV (ms)'
        },
        grid: {
          drawOnChartArea: false,
        },
      },
      y2: {
        type: 'linear' as const,
        display: false,
        min: 0,
        max: 100,
      },
    },
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Prayer Mode</h1>
        <p className="text-slate-600">Live biometric monitoring for your spiritual practice</p>
      </div>

      <div className="card mb-6">
        <div className="text-center mb-6">
          <div className="text-6xl font-bold text-soul-600 mb-2">
            {formatDuration(duration)}
          </div>
          <div className="flex justify-center space-x-4">
            {!isActive ? (
              <button onClick={startSession} className="btn btn-primary">
                <Play className="w-4 h-4 mr-2" />
                Start Session
              </button>
            ) : (
              <>
                <button onClick={pauseSession} className="btn btn-secondary">
                  {isPaused ? <Play className="w-4 h-4 mr-2" /> : <Pause className="w-4 h-4 mr-2" />}
                  {isPaused ? 'Resume' : 'Pause'}
                </button>
                <button onClick={stopSession} className="btn btn-secondary">
                  <Square className="w-4 h-4 mr-2" />
                  Stop
                </button>
              </>
            )}
          </div>
        </div>

        {data.length > 0 && (
          <div className="mb-6">
            <Line data={chartData} options={chartOptions} />
          </div>
        )}

        {isActive && (
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold mb-4">Mark Distractions</h3>
            <div className="flex flex-wrap gap-2 mb-4">
              <button 
                onClick={() => addDistraction('mental')}
                className="btn btn-secondary text-sm"
              >
                <Plus className="w-3 h-3 mr-1" />
                Mental
              </button>
              <button 
                onClick={() => addDistraction('physical')}
                className="btn btn-secondary text-sm"
              >
                <Plus className="w-3 h-3 mr-1" />
                Physical
              </button>
              <button 
                onClick={() => addDistraction('emotional')}
                className="btn btn-secondary text-sm"
              >
                <Plus className="w-3 h-3 mr-1" />
                Emotional
              </button>
            </div>
            
            {distractions.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-medium">Session Distractions:</h4>
                {distractions.map((d, i) => (
                  <div key={i} className="text-sm bg-slate-50 p-2 rounded">
                    {d.timestamp.toLocaleTimeString()} - {d.type}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <div className="card">
        <h3 className="text-lg font-semibold mb-4">Session Notes</h3>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Reflect on your prayer or meditation session..."
          className="w-full h-24 p-3 border border-slate-300 rounded-lg resize-none focus:ring-2 focus:ring-soul-500 focus:border-transparent"
        />
      </div>
    </div>
  )
}