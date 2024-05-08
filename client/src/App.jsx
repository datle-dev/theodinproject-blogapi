import { useState } from 'react';
import './styles/App.css';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [apiResponse, setApiResponse] = useState({});

  const handleUsername = (e) => {
    setUsername(e.target.value);
    console.log(`username=${e.target.value}`);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
    console.log(`password=${e.target.value}`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    fetch('http://localhost:3000/signup', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setApiResponse(data);
      })
      .catch((err) => console.error(err));
  };

  return (
    <>
      <div className="m-4 p-4">
        <h1 className="text-3xl font-bold">Sign Up</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 rounded">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            onChange={handleUsername}
            className="border border-solid border-gray-300 rounded"
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={handlePassword}
            className="border border-solid border-gray-300 rounded"
          />
          <label htmlFor="confirm">Confirm Password</label>
          <input
            type="password"
            name="confirm"
            id="confirm"
            className="border border-solid border-gray-300 rounded"
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Sign Up
          </button>
          <h1 className="text-xl font-bold">Form Input States</h1>
          <p>username: {username}</p>
          <p>password: {password}</p>
          <h1 className="text-xl font-bold">Response JSON</h1>
          <p>{JSON.stringify(apiResponse)}</p>
        </form>
      </div>
    </>
  );
}

export default App;
