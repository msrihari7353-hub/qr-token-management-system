# Complete Setup Guide

## Step-by-Step Installation

### 1. Clone Repository

```bash
git clone https://github.com/msrihari7353-hub/qr-token-management-system.git
cd qr-token-management-system
```

### 2. Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Click "Add Project"
3. Enter project name and follow steps
4. Enable Firestore Database:
   - Go to Firestore Database
   - Click "Create Database"
   - Start in production mode
   - Choose location

5. Enable Authentication:
   - Go to Authentication
   - Click "Get Started"
   - Enable "Email/Password"

6. Get Service Account Key:
   - Go to Project Settings > Service Accounts
   - Click "Generate New Private Key"
   - Save the JSON file

7. Get Web Config:
   - Go to Project Settings > General
   - Scroll to "Your apps"
   - Click Web icon (</>)
   - Copy the config

### 3. Twilio Setup

1. Sign up at [Twilio](https://www.twilio.com/try-twilio)
2. Verify your email and phone
3. Get a phone number:
   - Go to Phone Numbers
   - Click "Buy a Number"
   - Choose a number with SMS capability
4. Get credentials:
   - Go to Console Dashboard
   - Copy Account SID
   - Copy Auth Token

### 4. Backend Setup

```bash
cd backend
npm install
```

Create `.env` file:
```bash
cp .env.example .env
```

Edit `.env`:
```
PORT=5000
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your-project.iam.gserviceaccount.com
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your-auth-token
TWILIO_PHONE_NUMBER=+1234567890
FRONTEND_URL=http://localhost:3000
```

Start backend:
```bash
npm start
```

Server should run on http://localhost:5000

### 5. Frontend Setup

```bash
cd frontend
npm install
```

Create `.env`:
```bash
echo "REACT_APP_API_URL=http://localhost:5000/api" > .env
```

Start frontend:
```bash
npm start
```

App should open at http://localhost:3000

### 6. Admin App Setup

```bash
cd admin-app
npm install
```

Install Expo CLI globally:
```bash
npm install -g expo-cli
```

Update API URL in `src/config/api.js`:
```javascript
const API_BASE_URL = 'http://YOUR_COMPUTER_IP:5000/api';
// Replace YOUR_COMPUTER_IP with your actual IP
// Find it using: ipconfig (Windows) or ifconfig (Mac/Linux)
```

Start Expo:
```bash
npm start
```

Scan QR code with Expo Go app on your phone.

### 7. Testing the System

1. **Create Business Account**:
   - Open admin app
   - Click "Sign Up"
   - Fill details and create account

2. **Get QR Code**:
   - Login to admin app
   - Click "View QR Code"
   - Save/print the QR code

3. **Test Customer Flow**:
   - Scan QR code with phone camera
   - Fill the form
   - Check if SMS is received

4. **Test Admin Flow**:
   - Check dashboard for new token
   - Click "Call Next Token"
   - Verify SMS is sent

## Common Issues

### Backend won't start
- Check if port 5000 is available
- Verify all environment variables are set
- Check Firebase credentials

### SMS not sending
- Verify Twilio credentials
- Check phone number format (+country code)
- Ensure Twilio account has balance
- Check if number is verified (trial accounts)

### Frontend can't connect to backend
- Ensure backend is running
- Check CORS settings
- Verify API URL in frontend .env

### Mobile app can't connect
- Use computer's IP, not localhost
- Ensure phone and computer are on same network
- Check firewall settings
- Verify backend is accessible from network

### Firebase errors
- Check if Firestore is enabled
- Verify service account key is correct
- Ensure Authentication is enabled
- Check Firestore security rules

## Firestore Security Rules

Add these rules in Firebase Console > Firestore > Rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /businesses/{businessId} {
      allow read, write: if request.auth != null;
    }
    
    match /tokens/{tokenId} {
      allow read, write: if true;
    }
  }
}
```

## Next Steps

1. Test all features thoroughly
2. Customize UI/branding
3. Add more service types
4. Deploy to production
5. Set up monitoring
6. Configure backups

## Support

If you encounter issues:
1. Check error logs
2. Verify all credentials
3. Ensure all services are running
4. Check network connectivity
5. Review API documentation

## Production Checklist

Before deploying to production:
- [ ] Change all default passwords
- [ ] Set up proper Firebase security rules
- [ ] Enable HTTPS
- [ ] Configure CORS for specific domains
- [ ] Set up error monitoring
- [ ] Configure database backups
- [ ] Add rate limiting
- [ ] Test SMS delivery
- [ ] Verify QR codes work
- [ ] Test on multiple devices
- [ ] Set up analytics
- [ ] Create user documentation