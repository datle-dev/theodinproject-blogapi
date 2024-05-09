import { useState } from 'react';
import './styles/App.css';
import './SignupForm';
import SignupForm from './SignupForm';
import LoginForm from './LoginForm';

function App() {
  return (
    <>
      <SignupForm />
      <LoginForm />
    </>
  );
}

export default App;
