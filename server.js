const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();

// الاتصال بقاعدة البيانات
const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'u621743320_tak',
  password: 'Aa0557737365@',
  database: 'u621743320_tak'
});

connection.connect(error => {
  if (error) {
    console.error('فشل الاتصال بقاعدة البيانات:', error);
    return;
  }
  console.log('تم الاتصال بقاعدة البيانات');
});

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.json({ message: 'مرحبًا بك في نظام إدارة المشاريع' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`الخادم يعمل على المنفذ ${PORT}`);
});
