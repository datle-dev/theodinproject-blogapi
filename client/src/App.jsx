import { useState, createContext } from 'react';
import './styles/App.css';
import SignupForm from './SignupForm';
import LoginForm from './LoginForm';
import SecureRoute from './SecureRoute';
export const UserContext = createContext(null);

function App() {
  const [user, setUser] = useState(() => {
    if (localStorage.getItem('jwtblog') !== null) {
      return JSON.parse(localStorage.getItem('jwtblog')).username;
    } else {
      return null;
    }
  });

  const logout = () => {
    localStorage.removeItem('jwtblog');
    setUser(null);
  };

  return (
    <>
      {user !== null ? (
        <UserContext.Provider value={user}>
          <p>Welcome, {user}!</p>
          <SecureRoute />
          <button
            type="button"
            onClick={logout}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Log Out
          </button>
        </UserContext.Provider>
      ) : (
        <div>
          <p>You&apos;re not logged in</p>
          <SignupForm />
          <LoginForm toggleUser={setUser} />
        </div>
      )}
    </>
  );
}

export default App;
