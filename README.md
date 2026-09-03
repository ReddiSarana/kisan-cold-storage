# 🌾 AgroVault (एग्रोवोल्ट) — Smart Cold Storage & Procurement Platform

A web application designed for Indian farmers, cold storage facility operators, and procurement agencies. It solves post-harvest perishable crop losses by offering transparent cold room discovery, crop-specific temperature standards, live booking, digital Word (`.docx`) agreement & e-NWR generation, real-time yard gate token queues, and an automated SMS dispatch system.

---

## 🚀 Quick Start Instructions

### 1. Unified Production Server (Runs Client & Backend on Port 5000)
From the project directory:
```powershell
cd server
node src/server.js
```
Open **http://localhost:5000** in your browser.

### 2. Frontend Development Server (With Vite Hot-Reload)
```powershell
# Terminal 1: Backend API
cd server
node src/server.js

# Terminal 2: Vite Client
cd client
npm.cmd run dev
```
Open **http://localhost:3000** in your browser.

---

## 🌟 Key Features & Pages

### 1. About Us Page (`/about`)
- Overview of agricultural cold chains tackling India's ₹92,000 Cr annual post-harvest loss.
- 4-step workflow: Find &rarr; Book & Token &rarr; Priority Gate Weighment &rarr; e-NWR Payout.
- Farmer testimonials and WDRA compliance details.

### 2. Sign Up & Login Page (`/auth`)
- Role-based accounts for:
  - **Farmer (किसान)**: Book chambers, view tokens, receive SMS, download e-NWR.
  - **Cold Storage Operator (कोल्ड स्टोरेज संचालक)**: Manage bays, advance queues, record weighments.
  - **Procurement Officer (खरीद अधिकारी)**: Assay quality, moisture inspection, approve payouts.
- **1-Click Instant Demo Login**: Pre-configured profiles (Ramesh Kumar, Sanjay Singhal, Sunil Verma) for zero-friction evaluation.

### 3. Crops Catalog (`/crops`)
- Comprehensive agronomic storage profiles for **Potato, Apple, Onion, Tomato, Carrot, Green Chilli, Table Grapes, Citrus**.
- Displays optimal temperature (°C), relative humidity (RH %), ambient vs cold shelf life, packaging guidelines, and monthly tariffs.
- **"Find & Book Storage for this Crop"** one-click action linking directly to matching facilities.

### 4. Storage Units Location & Availability (`/storage-units`)
- Filter facilities by **Crop**, **District/State** (Agra, Nashik, Shimla, Kolar, Jalandhar), and **Tariff**.
- Real-time capacity progress bars (Available MT vs Total MT).
- Chamber specifications (Chilled, Controlled Atmosphere, Low Humidity Dry).
- Interactive **"Book Chamber Slot"** modal with automatic tariff calculator, advance fee breakdown, gate token issuance, and SMS confirmation.

### 5. Real-Time Yard Queue Management (`/queue`)
- Solves highway tractor congestion during harvest gluts.
- **Live Board**: Now Unloading (Bays 1-3), Next Called, Waiting in Holding Yard with countdown timers.
- Operator controls: Call Next Token to Bay, Start Weighment, Complete Unloading.
- **Automated SMS Dispatch**: Whenever a token is summoned or updated, the farmer receives an urgent SMS notification.
- Real-time synchronization via Server-Sent Events (SSE).

### 6. Interactive SMS Dispatcher & Live Smartphone Simulator (`/sms`)
- **Realistic On-Screen Smartphone Simulator**: Toggleable in the bottom right corner with incoming alert sound/bubble, status bar, and verified sender ID `AGROVAULT`.
- Full audit log of all dispatched SMS messages (Booking confirmations, Gate calls, Weighment reports, Settlements).
- Ready for live SMS gateways (Twilio / Fast2SMS) via environment variables.

### 7. Docx Requesting & Generation Page (`/documents`)
- Generates and downloads authentic, professionally formatted Microsoft Word (`.docx`) files using the official `docx` library:
  1. **Cold Storage Bailment Agreement** (Terms, liabilities, insurance, temperature guarantees).
  2. **Electronic Negotiable Warehouse Receipt (e-NWR)** (WDRA compliant for bank pledge loans).
  3. **Gate Entry & Inward Weighbridge Pass** (Gross, tare, net produce weight certificate).
- Document customizer and in-app layout preview.

### 8. Procurement & Transaction Progress Tracker (`/tracking`)
- 6-Stage visual pipeline:
  `Booking Reserved -> Gate Entry & Weighment -> Quality Inspection -> Chamber Stacking -> e-NWR Issued -> Financial Settlement`.
- Digital weighbridge logger (Gross kg, Tare kg, Net kg).
- Financial ledger tracking advance paid, handling charges, and outstanding balances.

---

## 🛠️ Tech Stack
- **Frontend**: React 18, Vite 6, Tailwind CSS, Lucide React Icons, SSE client.
- **Backend**: Node.js, Express.js, Server-Sent Events (`/api/events`), REST APIs.
- **Documents**: `docx` library generating valid `.docx` binary files with tables, headers, and legal templates.
- **Real-Time Engine**: Event-driven token queue with SSE updates and SMS trigger callbacks.
