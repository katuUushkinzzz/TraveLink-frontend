'use client';

import { useState } from 'react';
import AuthModal from './login.jsx';

export default function Home() {
  const [open, setOpen] = useState(true);

  return (
    <div style={{ height: '100vh' }}>
      
      {/* КНОПКА (если хочешь открывать вручную) */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          style={{
            margin: '50px',
            padding: '10px 20px',
            fontSize: '16px'
          }}
        >
          Открыть авторизацию
        </button>
      )}

      {/* МОДАЛКА */}
      {open && <AuthModal onClose={() => setOpen(false)} />}
      
    </div>
  );
}