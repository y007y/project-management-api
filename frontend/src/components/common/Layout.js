import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import authService from '../../services/auth.service';
import './Layout.css';

const Layout = () => {
  const navigate = useNavigate();
  const currentUser = authService.getCurrentUser();

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  return (
    <div className="layout">
      <nav className="sidebar">
        <div className="sidebar-header">
          <h3>نظام الإدارة</h3>
        </div>
        
        <ul className="nav-links">
          <li><Link to="/">الرئيسية</Link></li>
          <li><Link to="/projects">المشاريع</Link></li>
          <li><Link to="/tasks">المهام</Link></li>
          <li><Link to="/tickets">التذاكر</Link></li>
          <li><Link to="/profile">الملف الشخصي</Link></li>
        </ul>

        <div className="sidebar-footer">
          <button onClick={handleLogout} className="logout-btn">
            تسجيل الخروج
          </button>
        </div>
      </nav>

      <main className="content">
        <div className="header">
          <h4>مرحباً، {currentUser?.username}</h4>
        </div>
        <div className="main-content">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;