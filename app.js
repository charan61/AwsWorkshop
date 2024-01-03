const express = require('express');
const mysql = require('mysql2/promise');

const app = express();
const port = 3000;

// MySQL database configuration
const dbConfig = {
  host: 'database-1.c3k20uw0mfcf.us-east-1.rds.amazonaws.com', // Replace with your RDS endpoint
  user: 'admin',
  password: 'charanmm',
  database: 'database1',
};

// Route to fetch data from the database
app.get('/data', async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [rows] = await connection.execute('SELECT * FROM cricketers');
    connection.end();
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
