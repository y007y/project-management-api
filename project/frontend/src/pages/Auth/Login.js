import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/auth.service';
import './Auth.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);

    authService.login(email, password)
      .then(() => {
        navigate('/');
      })
      .catch(error => {
        setLoading(false);
        setMessage(error.response?.data?.message || 'فشل تسجيل الدخول');
      });
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleLogin}>
        <h2>تسجيل الدخول</h2>
        
        <div className="form-group">
          <label>البريد الإلكتروني</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>كلمة المرور</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button disabled={loading}>
          {loading ? 'جاري المعالجة...' : 'تسجيل الدخول'}
        </button>

        {message && <div className="alert alert-danger">{message}</div>}

        <p>
          ليس لديك حساب؟ <a href="/register">إنشاء حساب جديد</a>
        </p>
      </form>
    </div>
  );
};

export default Login;