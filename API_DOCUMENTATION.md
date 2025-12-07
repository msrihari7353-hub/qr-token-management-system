# API Documentation

Base URL: `http://localhost:5000/api` (development)

## Authentication

### Register Business
**POST** `/auth/signup`

Request:
```json
{
  "email": "business@example.com",
  "password": "securepassword",
  "businessName": "My Business",
  "businessType": "corporate"
}
```

Response:
```json
{
  "success": true,
  "message": "Business registered successfully",
  "userId": "firebase-user-id"
}
```

### Login
**POST** `/auth/login`

Request:
```json
{
  "uid": "firebase-user-id"
}
```

Response:
```json
{
  "success": true,
  "business": {
    "id": "business-id",
    "businessName": "My Business",
    "businessType": "corporate",
    "email": "business@example.com"
  }
}
```

## Business Management

### Get Business Details
**GET** `/business/:businessId`

Response:
```json
{
  "success": true,
  "business": {
    "id": "business-id",
    "businessName": "My Business",
    "businessType": "corporate",
    "services": [],
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### Update Services
**PUT** `/business/:businessId/services`

Request:
```json
{
  "services": ["Service 1", "Service 2"]
}
```

Response:
```json
{
  "success": true,
  "message": "Services updated successfully"
}
```

## Token Management

### Create Token
**POST** `/token/create`

Request:
```json
{
  "businessId": "business-id",
  "name": "John Doe",
  "phone": "+919876543210",
  "serviceType": "corporate",
  "additionalData": {
    "personToMeet": "Jane Smith",
    "department": "HR"
  },
  "notes": "Urgent meeting"
}
```

Response:
```json
{
  "success": true,
  "token": {
    "id": "token-id",
    "tokenNumber": "BUS-0001",
    "name": "John Doe",
    "phone": "+919876543210",
    "serviceType": "corporate",
    "status": "pending",
    "createdAt": "2024-01-01T10:00:00.000Z"
  }
}
```

### Get Business Tokens
**GET** `/token/business/:businessId?status=pending&date=2024-01-01`

Query Parameters:
- `status` (optional): pending | called | completed
- `date` (optional): YYYY-MM-DD format

Response:
```json
{
  "success": true,
  "tokens": [
    {
      "id": "token-id",
      "tokenNumber": "BUS-0001",
      "name": "John Doe",
      "phone": "+919876543210",
      "status": "pending",
      "createdAt": "2024-01-01T10:00:00.000Z"
    }
  ]
}
```

### Call Next Token
**POST** `/token/call-next/:businessId`

Response:
```json
{
  "success": true,
  "token": {
    "id": "token-id",
    "tokenNumber": "BUS-0001",
    "status": "called",
    "calledAt": "2024-01-01T10:30:00.000Z"
  }
}
```

### Complete Token
**PUT** `/token/complete/:tokenId`

Response:
```json
{
  "success": true,
  "message": "Token completed"
}
```

## QR Code

### Generate QR Code
**GET** `/qr/generate/:businessId`

Response:
```json
{
  "success": true,
  "qrCode": "data:image/png;base64,...",
  "url": "http://localhost:3000/customer/business-id"
}
```

## Analytics

### Get Analytics
**GET** `/analytics/:businessId?date=2024-01-01`

Query Parameters:
- `date` (optional): YYYY-MM-DD format (defaults to today)

Response:
```json
{
  "success": true,
  "analytics": {
    "date": "2024-01-01",
    "totalCustomers": 50,
    "completedCustomers": 45,
    "pendingCustomers": 3,
    "calledCustomers": 2,
    "averageWaitTime": 15,
    "peakHour": "14:00",
    "hourlyDistribution": {
      "9": 5,
      "10": 8,
      "11": 12,
      "14": 15,
      "15": 10
    }
  }
}
```

## Error Responses

All endpoints may return error responses:

```json
{
  "success": false,
  "error": "Error message"
}
```

Common HTTP Status Codes:
- `200` - Success
- `400` - Bad Request
- `404` - Not Found
- `500` - Server Error

## Rate Limiting

Currently no rate limiting implemented. Consider adding for production.

## Authentication

Currently using Firebase UID for authentication. Consider adding JWT tokens for API security.

## CORS

CORS is enabled for all origins in development. Configure for specific domains in production.