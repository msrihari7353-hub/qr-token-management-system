# QR-Based Universal Token, Queue, and Appointment Management System

A complete token management system with customer web app and business admin mobile app.

## 🎯 Features

### Customer Web App
- Scan QR code to access token form
- Fill details based on service type (Corporate, Clinic, Temple, Hotel)
- Receive SMS confirmation with token number
- Get notified via SMS when it's your turn

### Admin Mobile App
- Login/Signup for business owners
- Real-time dashboard with pending, called, and completed tokens
- "Start Next Token" button with automatic SMS notification
- View customer details
- Analytics: total customers, average wait time, peak hours
- Generate and view QR code for business

## 📁 Project Structure

```
qr-token-management-system/
├── backend/              # Node.js Express server
│   ├── config/          # Firebase configuration
│   ├── routes/          # API routes
│   ├── services/        # SMS service
│   └── server.js        # Main server file
├── frontend/            # React web app (customer side)
│   ├── public/
│   ├── src/
│   │   ├── pages/      # Customer form and confirmation
│   │   └── config/     # API configuration
│   └── package.json
├── admin-app/           # React Native mobile app (admin side)
│   ├── src/
│   │   ├── screens/    # All app screens
│   │   └── config/     # API configuration
│   └── package.json
└── README.md
```

## 🚀 Tech Stack

- **Frontend**: React.js
- **Backend**: Node.js + Express
- **Database**: Firebase Firestore
- **Authentication**: Firebase Auth
- **Admin App**: React Native (Expo)
- **SMS**: Twilio
- **QR Code**: qrcode library

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Firebase account
- Twilio account (for SMS)
- Expo CLI (for mobile app)

## 🛠️ Installation

### 1. Backend Setup

```bash
cd backend
npm install

# Create .env file
cp .env.example .env

# Edit .env with your credentials:
# - Firebase credentials
# - Twilio credentials
# - Frontend URL

# Start server
npm start
```

### 2. Frontend Setup

```bash
cd frontend
npm install

# Create .env file
echo "REACT_APP_API_URL=http://localhost:5000/api" > .env

# Start development server
npm start
```

### 3. Admin App Setup

```bash
cd admin-app
npm install

# Update API URL in src/config/api.js
# Replace YOUR_SERVER_IP with your server IP

# Start Expo
npm start

# Scan QR code with Expo Go app
```

## 🔧 Configuration

### Firebase Setup

1. Create a Firebase project at https://console.firebase.google.com
2. Enable Firestore Database
3. Enable Authentication (Email/Password)
4. Download service account key
5. Add credentials to backend/.env

### Twilio Setup

1. Sign up at https://www.twilio.com
2. Get Account SID and Auth Token
3. Get a phone number
4. Add credentials to backend/.env

## 📱 Database Schema

### Businesses Collection
```javascript
{
  businessName: string,
  businessType: string,
  email: string,
  services: array,
  createdAt: timestamp
}
```

### Tokens Collection
```javascript
{
  businessId: string,
  tokenNumber: string,
  name: string,
  phone: string,
  serviceType: string,
  additionalData: object,
  notes: string,
  status: 'pending' | 'called' | 'completed',
  date: string,
  createdAt: timestamp,
  calledAt: timestamp,
  completedAt: timestamp
}
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/signup` - Register business
- `POST /api/auth/login` - Login business

### Business
- `GET /api/business/:businessId` - Get business details
- `PUT /api/business/:businessId/services` - Update services

### Tokens
- `POST /api/token/create` - Create new token
- `GET /api/token/business/:businessId` - Get business tokens
- `POST /api/token/call-next/:businessId` - Call next token
- `PUT /api/token/complete/:tokenId` - Complete token

### QR Code
- `GET /api/qr/generate/:businessId` - Generate QR code

### Analytics
- `GET /api/analytics/:businessId` - Get analytics

## 📧 SMS Templates

### Token Created
```
Hello {NAME}, your token is {TOKEN}. Please wait for the notification.
```

### Token Called
```
Token {TOKEN}, it is your turn. Please come now.
```

## 🎨 UI Screenshots

### Customer Web App
- Clean, mobile-responsive form
- Service-specific fields
- Confirmation page with token number

### Admin Mobile App
- Dashboard with statistics
- Token list with status
- Analytics screen
- QR code display

## 🚀 Deployment

### Backend (Railway/Heroku)
```bash
# Deploy to Railway
railway up

# Or deploy to Heroku
heroku create
git push heroku main
```

### Frontend (Vercel/Netlify)
```bash
# Deploy to Vercel
vercel

# Or deploy to Netlify
netlify deploy
```

### Mobile App
```bash
# Build for Android
expo build:android

# Build for iOS
expo build:ios
```

## 📝 Usage Flow

1. **Business Setup**
   - Business owner signs up via admin app
   - System generates unique QR code
   - Business displays QR code at location

2. **Customer Journey**
   - Customer scans QR code
   - Fills form with details
   - Receives token number via SMS
   - Waits for turn notification

3. **Admin Management**
   - Admin views pending tokens
   - Clicks "Call Next Token"
   - Customer receives SMS notification
   - Admin marks token as completed

## 🔒 Security

- Firebase Authentication for secure login
- Environment variables for sensitive data
- CORS enabled for frontend access
- Input validation on all forms

## 🐛 Troubleshooting

### SMS not sending
- Check Twilio credentials
- Verify phone number format (+91XXXXXXXXXX)
- Check Twilio account balance

### QR code not working
- Ensure frontend URL is correct
- Check if backend is running
- Verify businessId is valid

### Mobile app not connecting
- Update API URL with correct server IP
- Ensure backend is accessible from mobile network
- Check firewall settings

## 📄 License

MIT License

## 👥 Support

For issues and questions, please create an issue on GitHub.

## 🎉 Credits

Built with ❤️ for efficient queue management