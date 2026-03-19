'use client';

import Login from './components/Login';
import { useState } from 'react';

export default function Home() {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div>
      {showLogin && <Login onClose={() => setShowLogin(false)} />}
    </div>
  );
}