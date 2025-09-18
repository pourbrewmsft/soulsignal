// Web Bluetooth API types
interface BluetoothRequestDeviceOptions {
  filters?: BluetoothLEScanFilter[]
  optionalServices?: string[]
}

interface BluetoothLEScanFilter {
  name?: string
  namePrefix?: string
  services?: string[]
}

interface BluetoothDevice {
  id: string
  name?: string
  gatt?: BluetoothRemoteGATTServer
}

interface BluetoothRemoteGATTServer {
  device: BluetoothDevice
  connected: boolean
  connect(): Promise<BluetoothRemoteGATTServer>
  disconnect(): void
}

interface Bluetooth extends EventTarget {
  requestDevice(options: BluetoothRequestDeviceOptions): Promise<BluetoothDevice>
  getAvailability(): Promise<boolean>
}

interface Navigator {
  bluetooth?: Bluetooth
}