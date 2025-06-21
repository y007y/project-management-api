require('dotenv').config(); // تحميل متغيرات البيئة من .env

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();

// الاتصال بقاعدة البيانات باستخدام القيم من ملف .env
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// التحقق من الاتصال
connection.connect(error => {
  if (error) {
    console.error('فشل الاتصال بقاعدة البيانات:', error);
    return;
  }
  console.log('✅ تم الاتصال بقاعدة البيانات بنجاح');
});

// إعدادات الميدل وير
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// نقطة البداية (اختبار فقط)
app.get('/', (req, res) => {
  res.json({ message: 'مرحبًا بك في نظام إدارة المشاريع' });
});

// بدء الخادم
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 الخادم يعمل على المنفذ ${PORT}`);
});
