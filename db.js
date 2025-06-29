import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();

const connectionUrl = process.env.MYSQL_URL;

const db = mysql.createConnection(connectionUrl);

db.connect((err) => {
  if (err) {
    console.error('❌ MySQL connection failed:', err.message);
  } else {
    console.log('✅ Connected to Railway MySQL');
  }
});

export default db;
