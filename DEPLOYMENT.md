# Deployment Guide

## Backend Deployment

### Option 1: Railway

1. Install Railway CLI:
```bash
npm install -g @railway/cli
```

2. Login and deploy:
```bash
railway login
railway init
railway up
```

3. Add environment variables in Railway dashboard

### Option 2: Heroku

1. Install Heroku CLI and login:
```bash
heroku login
```

2. Create and deploy:
```bash
cd backend
heroku create your-app-name
git push heroku main
```

3. Set environment variables:
```bash
heroku config:set FIREBASE_PROJECT_ID=your-project-id
heroku config:set TWILIO_ACCOUNT_SID=your-sid
# ... add all env variables
```

### Option 3: DigitalOcean/AWS

1. Create a droplet/EC2 instance
2. SSH into server
3. Install Node.js and PM2:
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
sudo npm install -g pm2
```

4. Clone and setup:
```bash
git clone your-repo-url
cd backend
npm install
pm2 start server.js
pm2 save
pm2 startup
```

## Frontend Deployment

### Option 1: Vercel

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
cd frontend
vercel
```

3. Add environment variables in Vercel dashboard

### Option 2: Netlify

1. Install Netlify CLI:
```bash
npm install -g netlify-cli
```

2. Build and deploy:
```bash
cd frontend
npm run build
netlify deploy --prod
```

### Option 3: Firebase Hosting

1. Install Firebase CLI:
```bash
npm install -g firebase-tools
firebase login
```

2. Initialize and deploy:
```bash
cd frontend
firebase init hosting
npm run build
firebase deploy
```

## Mobile App Deployment

### Android

1. Build APK:
```bash
cd admin-app
expo build:android
```

2. Download APK from Expo
3. Upload to Google Play Store

### iOS

1. Build IPA:
```bash
cd admin-app
expo build:ios
```

2. Download IPA from Expo
3. Upload to App Store Connect

### Alternative: Expo Go

For testing, users can:
1. Install Expo Go app
2. Scan QR code from `expo start`

## Environment Variables

### Backend (.env)
```
PORT=5000
FIREBASE_PROJECT_ID=
FIREBASE_PRIVATE_KEY=
FIREBASE_CLIENT_EMAIL=
TWILIO_ACCOUNT_SID=
TWILIO_AUTH_TOKEN=
TWILIO_PHONE_NUMBER=
FRONTEND_URL=https://your-frontend-url.com
```

### Frontend (.env)
```
REACT_APP_API_URL=https://your-backend-url.com/api
```

### Admin App (src/config/api.js)
```javascript
const API_BASE_URL = 'https://your-backend-url.com/api';
```

## Post-Deployment Checklist

- [ ] Backend server is running
- [ ] Frontend can connect to backend
- [ ] Firebase is configured correctly
- [ ] Twilio SMS is working
- [ ] QR codes are generating
- [ ] Mobile app can connect to backend
- [ ] All environment variables are set
- [ ] CORS is configured for frontend domain
- [ ] SSL certificates are installed (HTTPS)
- [ ] Database backups are configured

## Monitoring

### Backend Monitoring
```bash
# Using PM2
pm2 logs
pm2 monit

# Check status
pm2 status
```

### Error Tracking
Consider adding:
- Sentry for error tracking
- LogRocket for session replay
- Google Analytics for usage tracking

## Scaling

### Backend
- Use load balancer (Nginx)
- Add Redis for caching
- Use CDN for static assets
- Enable database indexing

### Database
- Add Firestore indexes for queries
- Enable backup and restore
- Monitor read/write operations

## Security

- Enable HTTPS only
- Set up firewall rules
- Use environment variables
- Enable rate limiting
- Add API authentication
- Regular security updates

## Backup Strategy

1. **Database**: Daily Firestore backups
2. **Code**: Git repository
3. **Environment**: Secure .env backup
4. **Media**: Cloud storage backup