import { useAuth } from '../auth/AuthContext';

export default function Profile({ onClose }) {
  const { userId } = useAuth();

  return (
    <div className="absolute top-16 left-4 bg-white shadow-lg rounded p-4 w-64 z-50">
      <h3 className="font-semibold mb-2">User Profile</h3>
      <p className="text-sm">User ID: {userId}</p>

      <button
        onClick={onClose}
        className="mt-3 text-blue-600 text-sm"
      >
        Close
      </button>
    </div>
  );
}
