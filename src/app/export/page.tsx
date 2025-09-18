'use client'

import { useState } from 'react'
import { Download, Calendar, FileText, Database } from 'lucide-react'

export default function ExportPage() {
  const [exportFormat, setExportFormat] = useState<'csv' | 'json'>('csv')
  const [dateRange, setDateRange] = useState({
    startDate: '',
    endDate: ''
  })
  const [dataTypes, setDataTypes] = useState({
    sessions: true,
    biometricReadings: true,
    distractions: true,
    summaries: true
  })

  const generateMockData = () => {
    const mockSessions = [
      {
        id: '1',
        type: 'meditation',
        startTime: new Date('2024-01-15T10:00:00'),
        endTime: new Date('2024-01-15T10:20:00'),
        duration: 1200,
        notes: 'Peaceful morning meditation session'
      },
      {
        id: '2',
        type: 'prayer',
        startTime: new Date('2024-01-15T19:00:00'),
        endTime: new Date('2024-01-15T19:15:00'),
        duration: 900,
        notes: 'Evening gratitude prayer'
      }
    ]

    const mockReadings = [
      {
        id: '1',
        sessionId: '1',
        timestamp: new Date('2024-01-15T10:05:00'),
        deviceType: 'oura',
        dataType: 'heart_rate',
        value: 68,
        unit: 'bpm'
      },
      {
        id: '2',
        sessionId: '1',
        timestamp: new Date('2024-01-15T10:10:00'),
        deviceType: 'muse',
        dataType: 'eeg',
        value: 75.5,
        unit: 'focus_percentage'
      }
    ]

    return { sessions: mockSessions, readings: mockReadings }
  }

  const exportToCSV = () => {
    const { sessions, readings } = generateMockData()
    
    let csv = ''
    
    if (dataTypes.sessions) {
      csv += 'Sessions\n'
      csv += 'ID,Type,Start Time,End Time,Duration (seconds),Notes\n'
      sessions.forEach(session => {
        csv += `${session.id},${session.type},${session.startTime.toISOString()},${session.endTime?.toISOString()},${session.duration},"${session.notes}"\n`
      })
      csv += '\n'
    }
    
    if (dataTypes.biometricReadings) {
      csv += 'Biometric Readings\n'
      csv += 'ID,Session ID,Timestamp,Device Type,Data Type,Value,Unit\n'
      readings.forEach(reading => {
        csv += `${reading.id},${reading.sessionId},${reading.timestamp.toISOString()},${reading.deviceType},${reading.dataType},${reading.value},${reading.unit}\n`
      })
    }

    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `soulsignal-export-${new Date().toISOString().split('T')[0]}.csv`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
  }

  const exportToJSON = () => {
    const { sessions, readings } = generateMockData()
    
    const exportData: {
      exportDate: string
      dateRange: typeof dateRange
      data: {
        sessions?: typeof sessions
        biometricReadings?: typeof readings
      }
    } = {
      exportDate: new Date().toISOString(),
      dateRange,
      data: {}
    }

    if (dataTypes.sessions) {
      exportData.data.sessions = sessions
    }
    if (dataTypes.biometricReadings) {
      exportData.data.biometricReadings = readings
    }

    const json = JSON.stringify(exportData, null, 2)
    const blob = new Blob([json], { type: 'application/json' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `soulsignal-export-${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
  }

  const handleExport = () => {
    if (exportFormat === 'csv') {
      exportToCSV()
    } else {
      exportToJSON()
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Export Data</h1>
        <p className="text-slate-600">Export your biometric and session data for external analysis</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold mb-4">Export Settings</h3>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Export Format
              </label>
              <div className="flex space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="format"
                    value="csv"
                    checked={exportFormat === 'csv'}
                    onChange={(e) => setExportFormat(e.target.value as 'csv')}
                    className="mr-2"
                  />
                  <FileText className="w-4 h-4 mr-1" />
                  CSV
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="format"
                    value="json"
                    checked={exportFormat === 'json'}
                    onChange={(e) => setExportFormat(e.target.value as 'json')}
                    className="mr-2"
                  />
                  <Database className="w-4 h-4 mr-1" />
                  JSON
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                <Calendar className="w-4 h-4 inline mr-1" />
                Date Range
              </label>
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="date"
                  value={dateRange.startDate}
                  onChange={(e) => setDateRange(prev => ({ ...prev, startDate: e.target.value }))}
                  className="p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-soul-500 focus:border-transparent"
                />
                <input
                  type="date"
                  value={dateRange.endDate}
                  onChange={(e) => setDateRange(prev => ({ ...prev, endDate: e.target.value }))}
                  className="p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-soul-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Data Types to Include
              </label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={dataTypes.sessions}
                    onChange={(e) => setDataTypes(prev => ({ ...prev, sessions: e.target.checked }))}
                    className="mr-2"
                  />
                  Prayer/Meditation Sessions
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={dataTypes.biometricReadings}
                    onChange={(e) => setDataTypes(prev => ({ ...prev, biometricReadings: e.target.checked }))}
                    className="mr-2"
                  />
                  Biometric Readings (HR, HRV, EEG)
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={dataTypes.distractions}
                    onChange={(e) => setDataTypes(prev => ({ ...prev, distractions: e.target.checked }))}
                    className="mr-2"
                  />
                  Distraction Markers
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={dataTypes.summaries}
                    onChange={(e) => setDataTypes(prev => ({ ...prev, summaries: e.target.checked }))}
                    className="mr-2"
                  />
                  Daily Summaries
                </label>
              </div>
            </div>
          </div>

          <button
            onClick={handleExport}
            className="btn btn-primary w-full mt-6"
          >
            <Download className="w-4 h-4 mr-2" />
            Export Data ({exportFormat.toUpperCase()})
          </button>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold mb-4">Data Privacy</h3>
          
          <div className="space-y-4 text-sm">
            <div className="bg-soul-50 p-4 rounded-lg">
              <h4 className="font-medium text-soul-900 mb-2">What&apos;s Included</h4>
              <ul className="space-y-1 text-soul-700">
                <li>• Session timing and duration</li>
                <li>• Biometric measurements during sessions</li>
                <li>• Personal notes and reflections</li>
                <li>• Distraction markers and timestamps</li>
              </ul>
            </div>

            <div className="bg-amber-50 p-4 rounded-lg">
              <h4 className="font-medium text-amber-900 mb-2">Privacy Notice</h4>
              <p className="text-amber-700">
                Exported data contains personal health information. Keep files secure 
                and only share with trusted healthcare providers or researchers with 
                proper data handling protocols.
              </p>
            </div>

            <div className="bg-slate-50 p-4 rounded-lg">
              <h4 className="font-medium text-slate-900 mb-2">File Formats</h4>
              <div className="text-slate-700">
                <p><strong>CSV:</strong> Compatible with Excel, Google Sheets, and statistical software</p>
                <p className="mt-1"><strong>JSON:</strong> Machine-readable format for developers and advanced analysis</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}