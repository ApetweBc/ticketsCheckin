# GCAC Tickets Check-in System

A web-based ticket management system for the GCAC Independence Gala event. This application allows event staff to validate and manage ticket statuses through barcode scanning or manual entry.

## Features

- Ticket validation through barcode scanning
- Manual ticket number entry
- Real-time ticket status updates
- Mobile-friendly interface
- View all tickets and their statuses
- Track redeemed tickets
- VIP ticket support

## Technology Stack

- Node.js with Express.js backend
- Pure JavaScript frontend
- Bootstrap 4.5.2 for UI
- QuaggaJS for barcode scanning
- JSON file-based data storage

## Installation

1. Clone the repository:
```sh
git clone https://github.com/yourusername/ticketsCheckin.git
cd ticketsCheckin
```

2. Install dependencies:
```sh
npm install
```

3. Start the server:
```sh
node server.js
```

4. Access the application at:
```
http://localhost:8080
```

## Usage

### Checking In Tickets

1. Open the home page
2. Either:
   - Click "Use Camera to Scan" to scan ticket barcode
   - Manually enter the ticket number (without "GCAC-" prefix)
3. Click "Lookup Ticket" to verify ticket status
4. Click "Redeem" to mark ticket as used

### Viewing Tickets

- Visit `/mytickets.html` to view all tickets
- Visit `/soldtickets.html` to view redeemed tickets

## File Structure

- `server.js` - Express server and API endpoints
- `tickets.json` - Ticket database
- `public/`
  - `index.html` - Main check-in interface
  - `app.js` - Main application logic
  - `mytickets.html` - All tickets view
  - `soldtickets.html` - Redeemed tickets view

## API Endpoints

- `GET /api/tickets` - Retrieve all tickets
- `POST /api/tickets` - Update ticket status

## License

Copyright © 2023 GCAC
