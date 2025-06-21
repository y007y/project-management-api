const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
HEAD
const mysql = require('mysql2');

const app = express();

// إعداد الاتصال بقاعدة البيانات
const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'u621743320_tak',
  password: 'Aa0557737365@',
  database: 'u621743320_tak'
});

// اختبار الاتصال
connection.connect(error => {
  if (error) {
    console.error('فشل الاتصال بقاعدة البيانات:', error);
    return;
  }
  console.log('تم الاتصال بقاعدة البيانات بنجاح');
});


const db = require('./config/db.config');

const app = express();

// Middleware
>>>>>>> 2b0a9f9b4d2e9bb813b65913e8a13d68f81842e9
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

 HEAD
// المسارات (routes)
=======
// اختبار اتصال قاعدة البيانات
db.authenticate()
  .then(() => console.log('تم الاتصال بقاعدة البيانات بنجاح'))
  .catch(err => console.error('فشل الاتصال بقاعدة البيانات:', err));

// Routes
>>>>>>> 2b0a9f9b4d2e9bb813b65913e8a13d68f81842e9
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/projects', require('./routes/project.routes'));
app.use('/api/tasks', require('./routes/task.routes'));
app.use('/api/tickets', require('./routes/ticket.routes'));

 HEAD

// الصفحة الرئيسية
 2b0a9f9b4d2e9bb813b65913e8a13d68f81842e9
app.get('/', (req, res) => {
  res.json({ message: 'مرحبًا بك في نظام إدارة المشاريع' });
});

 HEAD
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`الخادم يعمل على المنفذ ${PORT}`);
});

// تعيين المنفذ وبدء الخادم
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`الخادم يعمل على المنفذ ${PORT}`);
});
 2b0a9f9b4d2e9bb813b65913e8a13d68f81842e9
