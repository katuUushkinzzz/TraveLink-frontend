'use client';
import { useState } from 'react';
import './login.css';

function AuthModal({ onClose }) {
  const [mode, setMode] = useState('login');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = () => {
    if (mode === 'login') {
      alert(`Вход: ${email}`);
    } else {
      alert(`Регистрация: ${name}, ${email}`);
    }
  };

  return (
    <div className="login-overlay">
      <div className="login-modal">

        {mode === 'register' && (
          <img
            src="/arrow-back.svg"
            alt="Назад"
            className="back-arrow"
            onClick={() => setMode('login')}
          />
        )}

        <button className="login-close" type="button" onClick={onClose}>
          <img src="/close.svg" alt="закрыть" width={20} height={20} />
        </button>

        <h2 className="login-title">
          {mode === 'login' ? 'Вход' : 'Регистрация'}
        </h2>

        {/* ===== LOGIN ===== */}
        {mode === 'login' && (
          <>
            <input
              className="login-input"
              type="email"
              placeholder="Почта"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <div className="password-container">
              <input
                className="password-input"
                type={showPassword ? 'text' : 'password'}
                placeholder="Пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button className="eye-button" type="button" onClick={() => setShowPassword(!showPassword)}>
                <img
                  src={showPassword ? "/eye-open.svg" : "/eye-closed.svg"}
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
              <img src="/VK.svg" alt="vk" width={28} height={28} />
              Войти с VK ID
            </button>

            <p className="login-register">
              Еще нет аккаунта?{' '}
              <a onClick={() => setMode('register')}>Зарегистрироваться</a>
            </p>
          </>
        )}

        {/* ===== REGISTER ===== */}
        {mode === 'register' && (
          <>
            <input
              className="reg-input"
              type="text"
              placeholder="Имя"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              className="reg-input"
              type="email"
              placeholder="Почта"
              value={email}
              onChange={(e) =>


setEmail(e.target.value)}
            />

            <div className="password-container-reg">
              <input
                className="password-input"
                type={showPassword ? 'text' : 'password'}
                placeholder="Пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button className="eye-button" type="button" onClick={() => setShowPassword(!showPassword)}>
                <img
                  src={showPassword ? "/eye-open.svg" : "/eye-closed.svg"}
                  className="eye-icon"
                />
              </button>
            </div>

            <div className="password-container-reg">
              <input
                className="password-input"
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Подтвердите пароль"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button className="eye-button" type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                <img
                  src={showConfirmPassword ? "/eye-open.svg" : "/eye-closed.svg"}
                  className="eye-icon"
                />
              </button>
            </div>

            <button className="login-btn-main" type="button" onClick={handleSubmit}>
              Зарегистрироваться
            </button>
          </>
        )}

      </div>
    </div>
  );
}

export default AuthModal;