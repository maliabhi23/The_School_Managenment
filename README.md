# The_School_Managenment

A Node.js REST API for managing school data with location-based sorting capabilities. This system allows users to add new schools and retrieve schools sorted by proximity to a specified location.

## 🚀 Features

- **Add School**: Add new schools with name, address, and geographical coordinates
- **List Schools**: Retrieve all schools sorted by proximity to user's location
- **Location-based Sorting**: Uses Haversine formula for accurate distance calculations
- **Input Validation**: Comprehensive validation for all API endpoints
- **MySQL Database**: Persistent storage with proper indexing

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- Node.js (v14.0.0 or higher)
- npm (v6.0.0 or higher)
- MySQL (v8.0 or higher)
- Git

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd The_School_Managenment
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Database Setup**
   ```sql
   CREATE DATABASE school_management;
   USE school_management;
   
   CREATE TABLE schools (
       id INT AUTO_INCREMENT PRIMARY KEY,
       name VARCHAR(255) NOT NULL,
       address VARCHAR(500) NOT NULL,
       latitude FLOAT NOT NULL,
       longitude FLOAT NOT NULL,
       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
       updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
   );
   
   -- Create index for better performance on location queries
   CREATE INDEX idx_location ON schools(latitude, longitude);
   ```

4. **Environment Configuration**
   Create a `.env` file in the root directory:
   ```env
   PORT=3000
   DB_HOST=localhost
   DB_USER=your_mysql_username
   DB_PASSWORD=your_mysql_password
   DB_NAME=school_management
   NODE_ENV=development
   ```

5. **Start the server**
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

## 📚 API Documentation

### Base URL
```
http://localhost:3000/api
```

### Endpoints

#### 1. Add School
**POST** `/addSchool`

Add a new school to the database.

**Request Body:**
```json
{
  "name": "Delhi Public School",
  "address": "Sector 45, Gurgaon, Haryana, India",
  "latitude": 28.4595,
  "longitude": 77.0266
}
```

**Response:**
```json
{
  "success": true,
  "message": "School added successfully",
  "data": {
    "id": 1,
    "name": "Delhi Public School",
    "address": "Sector 45, Gurgaon, Haryana, India",
    "latitude": 28.4595,
    "longitude": 77.0266
  }
}
```

**Validation Rules:**
- `name`: Required, string, max 255 characters
- `address`: Required, string, max 500 characters
- `latitude`: Required, number, range -90 to 90
- `longitude`: Required, number, range -180 to 180

#### 2. List Schools
**GET** `/listSchools`

Retrieve all schools sorted by proximity to user's location.

**Query Parameters:**
- `latitude` (required): User's latitude (-90 to 90)
- `longitude` (required): User's longitude (-180 to 180)

**Example Request:**
```
GET /listSchools?latitude=28.7041&longitude=77.1025
```

**Response:**
```json
{
  "success": true,
  "message": "Schools retrieved successfully",
  "data": [
    {
      "id": 1,
      "name": "Delhi Public School",
      "address": "Sector 45, Gurgaon, Haryana, India",
      "latitude": 28.4595,
      "longitude": 77.0266,
      "distance": 15.2
    },
    {
      "id": 2,
      "name": "Ryan International School",
      "address": "Vasant Kunj, New Delhi, India",
      "latitude": 28.5244,
      "longitude": 77.1588,
      "distance": 22.8
    }
  ]
}
```

### Error Responses

All endpoints return consistent error responses:

```json
{
  "success": false,
  "message": "Error description",
  "errors": [
    {
      "field": "latitude",
      "message": "Latitude must be between -90 and 90"
    }
  ]
}
```

**Common HTTP Status Codes:**
- `200`: Success
- `201`: Created
- `400`: Bad Request (Validation Error)
- `500`: Internal Server Error

## 🧪 Testing

### Using Postman

1. **Import the Postman Collection**
   - Download the collection from: [[Postman Collection Link](https://www.postman.com/maliabhi3/workspace/dashboard-api-finance/collection/36462089-e2e335a2-923e-40b8-9667-d1f462907c15?action=share&creator=36462089)]
   - Import into Postman application

2. **Set Environment Variables**
   ```
   base_url: http://localhost:3000/api
   ```

3. **Test Cases Included**
   - Add School with valid data
   - Add School with invalid data (validation tests)
   - List Schools with valid coordinates
   - List Schools with invalid coordinates
   - Edge cases and error scenarios

### Manual Testing

**Add School Example:**
```bash
curl -X POST http://localhost:3000/api/addSchool \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test School",
    "address": "Test Address, Test City",
    "latitude": 28.7041,
    "longitude": 77.1025
  }'
```

**List Schools Example:**
```bash
curl "http://localhost:3000/api/listSchools?latitude=28.7041&longitude=77.1025"
```

## 📁 Project Structure

```
school-management-api/
├── src/
│   ├── controllers/
│   │   └── schoolController.js
│   ├── routes/
│   │   └── schoolRoutes.js
│   ├── config/
│   │   └── database.js
├── .env.example
├── .gitignore
├── package.json
├── server.js
└── README.md
```

## 🔧 Dependencies

```json
{
  "express": "^4.18.2",
  "mysql2": "^3.6.0",
  "dotenv": "^16.3.1",
  "cors": "^2.8.5",
  "helmet": "^7.0.0",
  "express-rate-limit": "^6.8.1",
  "joi": "^17.9.2"
}
```

## 🚀 Deployment

### Heroku Deployment

1. **Prepare for deployment**
   ```bash
   # Add Procfile
   echo "web: node server.js" > Procfile
   ```

2. **Deploy to Heroku**
   ```bash
   heroku create your-app-name
   heroku config:set NODE_ENV=production
   heroku config:set DB_HOST=your-db-host
   heroku config:set DB_USER=your-db-user
   heroku config:set DB_PASSWORD=your-db-password
   heroku config:set DB_NAME=your-db-name
   git push heroku main
   ```

### Railway/Render Deployment

1. Connect your GitHub repository
2. Set environment variables
3. Deploy automatically

## 🔐 Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port | `3000` |
| `DB_HOST` | MySQL host | `localhost` |
| `DB_USER` | MySQL username | `root` |
| `DB_PASSWORD` | MySQL password | `password123` |
| `DB_NAME` | Database name | `school_management` |
| `NODE_ENV` | Environment | `development` |

## 📊 Performance Considerations

- **Database Indexing**: Implemented on latitude/longitude for faster queries
- **Connection Pooling**: MySQL connection pooling for better performance
- **Rate Limiting**: API rate limiting to prevent abuse
- **Input Validation**: Server-side validation for data integrity
- **Error Handling**: Comprehensive error handling and logging

## 🧮 Distance Calculation

The API uses the **Haversine formula** to calculate the great-circle distance between two points on Earth:

```javascript
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth's radius in kilometers
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}
```

## 📝 Sample Data

```sql
INSERT INTO schools (name, address, latitude, longitude) VALUES
('Delhi Public School', 'Sector 45, Gurgaon, Haryana', 28.4595, 77.0266),
('Ryan International School', 'Vasant Kunj, New Delhi', 28.5244, 77.1588),
('DAV Public School', 'Punjabi Bagh, New Delhi', 28.6667, 77.1333),
('Kendriya Vidyalaya', 'R.K. Puram, New Delhi', 28.5622, 77.1822);
```

## 👥 Contact

- Name: [Abhishek Mali]
- Email: [abhishekmali9503@gmail.com]

## 🔗 Links
- **Live API**: [https://the-school-managenment.onrender.com]

## 📋 Deliverables Checklist

- ✅ **Deliverable 1**: Source code repository with complete API implementation
- ✅ **Deliverable 2**: Live API endpoints accessible for testing
- ✅ **Deliverable 3**: Postman collection shared via email or accessible link

