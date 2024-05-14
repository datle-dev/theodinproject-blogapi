import { useState, createContext } from 'react';
import './styles/App.css';
import SignupForm from './SignupForm';
import LoginForm from './LoginForm';
import CreatePost from './CreatePost';

import { Status } from './constants/status';

export const UserContext = createContext(null);
export const StatusContext = createContext(null);

function App() {
  const [status, setStatus] = useState(Status.VISITOR);
  const [user, setUser] = useState(() => {
    if (localStorage.getItem('jwtblog') !== null) {
      setStatus(Status.USER_HOME);
      return JSON.parse(localStorage.getItem('jwtblog')).username;
    } else {
      setStatus(Status.VISITOR);
      return null;
    }
  });

  const onClickCreatePost = () => {
    setStatus(Status.USER_WRITING);
  };

  const onClickHome = () => {
    setStatus(Status.USER_HOME);
  };

  const logout = () => {
    localStorage.removeItem('jwtblog');
    setUser(null);
    setStatus(Status.VISITOR);
  };

  if (status === Status.VISITOR) {
    return (
      <div>
        <p>You&apos;re not logged in</p>
        <SignupForm />
        <StatusContext.Provider value={{ status, setStatus }}>
          <LoginForm toggleUser={setUser} />
        </StatusContext.Provider>
      </div>
    );
  } else if (status === Status.USER_HOME) {
    return (
      <div>
        <p>Welcome, {user}!</p>
        <button
          type="button"
          onClick={onClickCreatePost}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Create Post
        </button>
        <button
          type="button"
          onClick={logout}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Log Out
        </button>
      </div>
    );
  } else if (status === Status.USER_WRITING) {
    return (
      <div>
        <UserContext.Provider value={user}>
          <CreatePost />
        </UserContext.Provider>
        <button
          type="button"
          onClick={onClickHome}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Back to Home
        </button>
      </div>
    );
  }
}

export default App;
