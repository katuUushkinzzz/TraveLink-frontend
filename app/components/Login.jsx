'use client';
import { useState } from 'react';
import './Login.css';

function Login({ onClose }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [visitedEmail, setVisitedEmail] = useState(false);
  const [visitedPassword, setVisitedPassword] = useState(false);

  const handleSubmit = () => {
    alert(`Вход: ${email}`);
  };

  return (
    <div className="login-overlay">
      <div className="login-modal">
        <button className="login-close" type="button" onClick={onClose}>
          <img src="/login/close.svg" alt="закрыть" width={20} height={20} />
        </button>
        <h2 className="login-title">Вход</h2>

        <input
          className="login-input"
          type="email"
          placeholder="Почта"
          value={email}
          onFocus={() => setVisitedEmail(true)}
          onBlur={() => setVisitedEmail(false)}
          style={{ borderColor: visitedEmail ? '#C9F3FF' : '' }}
        />

        <div className="password-container">
          <input
            className="password-input"
            type={showPassword ? 'text' : 'password'}
            placeholder="Пароль"
            value={password}
            onFocus={() => setVisitedPassword(true)}
            onBlur={() => setVisitedPassword(false)}
            style={{ borderColor: visitedPassword ? '#C9F3FF' : '' }}
          />
          <button className="eye-button" type="button" onClick={() => setShowPassword(!showPassword)}>
            <img
              src={showPassword ? "/login/eye-open.svg" : "/login/eye-closed.svg"}
              alt="показать пароль"
              className="eye-icon"
            />
          </button>
        </div>

        <div className="login-row">
          <label className="login-remember">
            <div className={`custom-checkbox ${remember ? 'checked' : ''}`} onClick={() => setRemember(!remember)}>
              {remember && (
                <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
                  <path d="M1 5L4.5 8.5L11 1" stroke="#53515E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </div>
            Запомнить пароль
          </label>
          <button type="button" className="login-forgot">Забыли пароль?</button>
        </div>

        <button className="login-btn-main" type="button" onClick={handleSubmit}>
          Войти
        </button>

        <div className="login-or">или</div>

        <button className="login-btn-vk" type="button">
          <img src="/login/VK.svg" alt="vk" width={28} height={28} />
          Войти с VK ID
        </button>

        <p className="login-register">
          Еще нет аккаунта? <a href="#">Зарегистрироваться</a>
        </p>
      </div>
    </div>
  );
}

export default Login;