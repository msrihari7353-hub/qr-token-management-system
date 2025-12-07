# Quick Start Guide

Get your QR Token Management System running in 15 minutes!

## Prerequisites Checklist

- [ ] Node.js installed (v14+)
- [ ] Firebase account created
- [ ] Twilio account created
- [ ] Phone for testing

## 5-Minute Setup

### 1. Clone & Install (2 minutes)

```bash
# Clone repository
git clone https://github.com/msrihari7353-hub/qr-token-management-system.git
cd qr-token-management-system

# Install backend
cd backend
npm install

# Install frontend
cd ../frontend
npm install

# Install admin app
cd ../admin-app
npm install
```

### 2. Firebase Setup (3 minutes)

1. Go to https://console.firebase.google.com
2. Create new project
3. Enable Firestore Database
4. Enable Email/Password Authentication
5. Download service account key (Settings > Service Accounts)

### 3. Twilio Setup (2 minutes)

1. Sign up at https://www.twilio.com
2. Get a phone number
3. Copy Account SID and Auth Token

### 4. Configure Backend (3 minutes)

```bash
cd backend
cp .env.example .env
```

Edit `.env` with your credentials:
```
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY="your-private-key"
FIREBASE_CLIENT_EMAIL=your-client-email
TWILIO_ACCOUNT_SID=your-sid
TWILIO_AUTH_TOKEN=your-token
TWILIO_PHONE_NUMBER=+1234567890
```

### 5. Start Everything (2 minutes)

**Terminal 1 - Backend:**
```bash
cd backend
npm start
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```

**Terminal 3 - Admin App:**
```bash
cd admin-app
npm start
```

### 6. Test (3 minutes)

1. Open admin app on phone (scan Expo QR)
2. Sign up with email/password
3. View QR code in app
4. Scan QR code with another phone
5. Fill form and submit
6. Check SMS received
7. Click "Call Next Token" in admin app
8. Check second SMS received

## That's It! 🎉

Your system is now running!

## Next Steps

- [ ] Customize service types
- [ ] Brand the UI
- [ ] Test with real users
- [ ] Deploy to production

## Common Issues

**Backend won't start?**
- Check if port 5000 is free
- Verify .env file exists

**SMS not working?**
- Check Twilio credentials
- Verify phone number format
- Check Twilio balance

**Can't connect to backend?**
- Ensure backend is running
- Check firewall settings

## Production Deployment

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment instructions.

## Need Help?

- 📖 Read [SETUP_GUIDE.md](SETUP_GUIDE.md) for detailed setup
- 📚 Check [API_DOCUMENTATION.md](API_DOCUMENTATION.md) for API details
- 🎯 See [FEATURES.md](FEATURES.md) for feature list
- 🗄️ Review [DATABASE_SCHEMA.md](DATABASE_SCHEMA.md) for database structure

## Support

Create an issue on GitHub if you encounter problems.

---

**Built with ❤️ for efficient queue management**