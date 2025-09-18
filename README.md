# SoulSignal

A Next.js + TypeScript web application that aggregates biometric data from multiple sources for enhanced meditation and prayer experiences.

## Features

- **Multi-Device Integration**
  - Oura Ring (OAuth connection)
  - Apple Health (file upload)
  - Garmin Connect (mock data)
  - Muse EEG (Web Bluetooth)

- **Prayer Mode**
  - Live biometric monitoring (HR, HRV, EEG)
  - Real-time data visualization
  - Distraction tracking and journaling
  - Session recording and analysis

- **Privacy-First Design**
  - Granular consent controls
  - Secure data encryption
  - Local data processing
  - GDPR compliant export functionality

- **Data Export**
  - CSV format for spreadsheet analysis
  - JSON format for developers
  - Customizable date ranges and data types

## Tech Stack

- **Frontend:** Next.js 14, TypeScript, Tailwind CSS
- **Database:** PostgreSQL with Prisma ORM
- **Charts:** Chart.js with React wrapper
- **Authentication:** NextAuth.js (planned)
- **APIs:** Oura Ring API, Web Bluetooth API

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.example .env.local
   ```
   Update with your database URL and API credentials.

3. **Set up the database:**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Open [http://localhost:3000](http://localhost:3000) to view the app**

## Project Structure

```
src/
├── app/                 # Next.js app directory
│   ├── dashboard/       # Main dashboard
│   ├── prayer-mode/     # Live biometric monitoring
│   ├── devices/         # Device connection management
│   ├── export/          # Data export functionality
│   └── api/             # API routes
├── components/          # Reusable UI components
├── lib/                 # Utility functions and database
└── types/              # TypeScript type definitions
```

## Privacy & Security

SoulSignal is designed with privacy as a core principle:

- All biometric data is encrypted at rest
- Users have granular control over data sharing
- No third-party analytics or tracking
- Data export allows users to own their information
- Consent can be revoked at any time

## Device Integration Status

- ✅ **Oura Ring:** OAuth integration ready
- ✅ **Apple Health:** File upload functionality
- ✅ **Garmin:** Mock data for demonstration
- ✅ **Muse EEG:** Web Bluetooth connection
- ✅ **Prayer Mode:** Live data visualization
- ✅ **Data Export:** CSV/JSON formats

## Contributing

This is a demonstration application. For production use, additional security hardening and OAuth implementations would be required.

## License

MIT License - see LICENSE file for details.