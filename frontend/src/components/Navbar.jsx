import { useState } from 'react';
import { useAuth } from '../auth/AuthContext';
import Profile from './Profile';

export default function Navbar() {
  const { logout } = useAuth();
  const [showProfile, setShowProfile] = useState(false);

  return (
    <nav className="relative flex items-center justify-between px-6 py-4 bg-blue-600 text-white">
      {/* Profile Icon */}
      <div>
        <button
          onClick={() => setShowProfile(!showProfile)}
          className="bg-white text-blue-600 rounded-full w-9 h-9 font-bold"
        >
          👤
        </button>
        {showProfile && <Profile onClose={() => setShowProfile(false)} />}
      </div>

      <h1 className="text-lg font-semibold">Task Manager</h1>

      <button
        onClick={logout}
        className="bg-white text-blue-600 px-4 py-1 rounded"
      >
        Logout
      </button>
    </nav>
  );
}
