export interface BiometricReading {
  id: string
  timestamp: Date
  deviceId: string
  deviceType: 'oura' | 'garmin' | 'apple' | 'muse'
  dataType: 'heart_rate' | 'hrv' | 'eeg' | 'sleep' | 'activity'
  value: number
  unit: string
  metadata?: Record<string, unknown>
}

export interface Session {
  id: string
  userId: string
  type: 'meditation' | 'prayer' | 'general'
  startTime: Date
  endTime?: Date
  duration?: number
  notes?: string
  distractions: Distraction[]
  readings: BiometricReading[]
}

export interface Distraction {
  id: string
  sessionId: string
  timestamp: Date
  type: 'mental' | 'physical' | 'emotional'
  intensity: number // 1-10
  note?: string
}

export interface UserConsent {
  id: string
  userId: string
  deviceType: 'oura' | 'garmin' | 'apple' | 'muse'
  dataTypes: string[]
  granted: boolean
  grantedAt: Date
  revokedAt?: Date
}

export interface DataSummary {
  id: string
  userId: string
  date: Date
  deviceType: string
  metrics: {
    avgHeartRate?: number
    avgHRV?: number
    totalSessions?: number
    totalMeditation?: number
  }
}

export interface DeviceConnection {
  id: string
  userId: string
  deviceType: 'oura' | 'garmin' | 'apple' | 'muse'
  deviceId: string
  isConnected: boolean
  lastSync?: Date
  accessToken?: string
  refreshToken?: string
}