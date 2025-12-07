# Database Schema

## Firebase Firestore Collections

### 1. businesses

Stores business/organization information.

```javascript
{
  // Document ID: Firebase Auth UID
  businessName: string,          // Name of the business
  businessType: string,          // Type: corporate, clinic, temple, hotel
  email: string,                 // Business email
  services: array<string>,       // List of available services
  createdAt: string,            // ISO timestamp
  updatedAt: string             // ISO timestamp (optional)
}
```

**Example:**
```javascript
{
  businessName: "Tech Corp",
  businessType: "corporate",
  email: "admin@techcorp.com",
  services: ["Meeting", "Interview", "Consultation"],
  createdAt: "2024-01-01T10:00:00.000Z"
}
```

**Indexes:**
- businessType (for filtering)
- createdAt (for sorting)

---

### 2. tokens

Stores customer token information.

```javascript
{
  // Document ID: Auto-generated
  businessId: string,           // Reference to business document
  tokenNumber: string,          // Unique token (e.g., "BUS-0001")
  name: string,                 // Customer name
  phone: string,                // Customer phone (+91XXXXXXXXXX)
  serviceType: string,          // Service category
  additionalData: object,       // Service-specific data
  notes: string,                // Optional customer notes
  status: string,               // pending | called | completed
  date: string,                 // Date in YYYY-MM-DD format
  createdAt: string,           // ISO timestamp
  calledAt: string | null,     // ISO timestamp when called
  completedAt: string | null   // ISO timestamp when completed
}
```

**Example:**
```javascript
{
  businessId: "abc123xyz",
  tokenNumber: "ABC-0001",
  name: "John Doe",
  phone: "+919876543210",
  serviceType: "corporate",
  additionalData: {
    personToMeet: "Jane Smith",
    department: "HR"
  },
  notes: "Urgent meeting",
  status: "pending",
  date: "2024-01-01",
  createdAt: "2024-01-01T10:00:00.000Z",
  calledAt: null,
  completedAt: null
}
```

**Indexes:**
- businessId + date + status (composite)
- businessId + createdAt (composite)
- status + date (composite)

---

## Additional Data Structures

### Corporate Service
```javascript
additionalData: {
  personToMeet: string,
  department: string
}
```

### Temple Service
```javascript
additionalData: {
  ritualType: string,
  darshanType: string
}
```

### Hotel Service
```javascript
additionalData: {
  roomType: string,      // AC | Non-AC
  numberOfPeople: number
}
```

### Clinic Service
```javascript
additionalData: {
  // Can be extended based on requirements
}
```

---

## Token Number Format

Format: `{PREFIX}-{NUMBER}`

- **PREFIX**: First 3 characters of businessId (uppercase)
- **NUMBER**: 4-digit sequential number (0001, 0002, etc.)
- Resets daily

**Examples:**
- `ABC-0001`
- `XYZ-0042`
- `TEC-0123`

---

## Status Flow

```
pending → called → completed
```

1. **pending**: Token created, waiting in queue
2. **called**: Customer notified via SMS, their turn
3. **completed**: Service completed

---

## Firestore Security Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Businesses collection
    match /businesses/{businessId} {
      // Only authenticated users can read/write their own business
      allow read, write: if request.auth != null && request.auth.uid == businessId;
    }
    
    // Tokens collection
    match /tokens/{tokenId} {
      // Anyone can create tokens (customer form)
      allow create: if true;
      
      // Only business owner can read/update their tokens
      allow read, update: if request.auth != null && 
                          request.auth.uid == resource.data.businessId;
    }
  }
}
```

---

## Query Examples

### Get pending tokens for today
```javascript
db.collection('tokens')
  .where('businessId', '==', businessId)
  .where('status', '==', 'pending')
  .where('date', '==', '2024-01-01')
  .orderBy('createdAt', 'asc')
  .get()
```

### Get all tokens for a business
```javascript
db.collection('tokens')
  .where('businessId', '==', businessId)
  .orderBy('createdAt', 'desc')
  .get()
```

### Get next pending token
```javascript
db.collection('tokens')
  .where('businessId', '==', businessId)
  .where('status', '==', 'pending')
  .where('date', '==', today)
  .orderBy('createdAt', 'asc')
  .limit(1)
  .get()
```

---

## Data Retention

- **Active tokens**: Keep for 30 days
- **Completed tokens**: Archive after 90 days
- **Business data**: Keep indefinitely

---

## Backup Strategy

1. **Daily backups**: Automated Firestore export
2. **Weekly snapshots**: Full database backup
3. **Retention**: Keep backups for 30 days

---

## Scaling Considerations

- Add composite indexes for common queries
- Use Firestore subcollections for large datasets
- Implement pagination for token lists
- Consider sharding for high-volume businesses
- Use Cloud Functions for automated cleanup