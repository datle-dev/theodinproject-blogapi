import { useState } from 'react';
import './styles/App.css';
import './SignupForm';
import SignupForm from './SignupForm';
import LoginForm from './LoginForm';
import SecureRoute from './SecureRoute';

function App() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <SignupForm />
      <LoginForm />
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <SecureRoute toggleLoading={setIsLoading} />
      )}
    </>
  );
}

export default App;
