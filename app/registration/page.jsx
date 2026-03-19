// src/pages/Registration.jsx
'use client';
import { useState } from 'react';
import './registration.css';


function Registration() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    return (
        <div className="page">
            <div className="modal">
                <div className="header">
                    <img
                        src="/arrow-back.svg"
                        alt="Назад"
                        className="icon left"
                    />
                    <h1 className="title">Регистрация</h1>
                    <img
                        src="/close.svg"
                        alt="Закрыть"
                        className="icon right"
                    />
                </div>

                <div className="form">
                    <input type="text" placeholder="Имя" />
                    <input type="email" placeholder="Почта" />
                    
                    {/* Поле Пароль с глазом */}
                    <div className="password-container">
                        <input 
                            type={showPassword ? "text" : "password"} 
                            placeholder="Пароль" 
                            className="password-input"
                        />
                        <button 
                            className="eye-button"
                            onClick={() => setShowPassword(!showPassword)}
                            type="button"
                        >
                            <img 
                                src={showPassword ? "/eye-open.svg" : "/eye-closed.svg"}
                                alt={showPassword ? "Скрыть пароль" : "Показать пароль"}
                                className="eye-icon"
                            />
                        </button>
                    </div>

                    {/* Поле Подтвердите пароль с глазом */}
                    <div className="password-container">
                        <input 
                            type={showConfirmPassword ? "text" : "password"} 
                            placeholder="Подтвердите пароль" 
                            className="password-input"
                        />
                        <button 
                            className="eye-button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            type="button"
                        >
                            <img 
                                src={showConfirmPassword ? "/eye-open.svg" : "/eye-closed.svg"}
                                alt={showConfirmPassword ? "Скрыть пароль" : "Показать пароль"}
                                className="eye-icon"
                            />
                        </button>
                    </div>

                    <button className="submit">
                        Зарегистрироваться
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Registration;