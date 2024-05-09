import { useState } from 'react';
import './styles/App.css';
import SignupForm from './SignupForm';
import LoginForm from './LoginForm';
import SecureRoute from './SecureRoute';

function App() {
  const [user, setUser] = useState(() => {
    if (localStorage.getItem('jwtblog') !== null) {
      return JSON.parse(localStorage.getItem('jwtblog')).username;
    } else {
      return null;
    }
  });

  return (
    <>
      {user !== null ? (
        <div>
          <p>Welcome, {user}!</p>
          <SecureRoute />
        </div>
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
