import { useState, createContext } from 'react';
import './styles/App.css';
import SignupForm from './SignupForm';
import LoginForm from './LoginForm';
import UserPosts from './UserPosts';
import SinglePost from './SinglePost';
import CreatePost from './CreatePost';
import CommentForm from './CommentForm';
import PostComments from './PostComments';

import { Status } from './constants/status';

export const UserContext = createContext(null);
export const StatusContext = createContext(null);
export const PostContext = createContext(null);

function App() {
  const [status, setStatus] = useState(Status.VISITOR);
  const [currentPost, setCurrentPost] = useState('');
  const [user, setUser] = useState(() => {
    if (localStorage.getItem('jwtblog') !== null) {
      setStatus(Status.USER_HOME);
      return JSON.parse(localStorage.getItem('jwtblog')).username;
    } else {
      setStatus(Status.VISITOR);
      setCurrentPost('');
      return null;
    }
  });

  const onClickCreatePost = () => {
    setStatus(Status.USER_WRITING);
    setCurrentPost('');
  };

  const onClickHome = () => {
    setStatus(Status.USER_HOME);
    setCurrentPost('');
  };

  const onClickViewPost = (e) => {
    e.preventDefault();
    setStatus(Status.USER_VIEWING_POST);
    setCurrentPost(e.target.href);
  };

  const logout = () => {
    localStorage.removeItem('jwtblog');
    setUser(null);
    setStatus(Status.VISITOR);
  };

  if (status === Status.VISITOR) {
    return (
      <div className="container mx-auto max-w-screen-md">
        <p>You&apos;re not logged in</p>
        <SignupForm />
        <StatusContext.Provider value={{ status, setStatus }}>
          <LoginForm toggleUser={setUser} />
        </StatusContext.Provider>
      </div>
    );
  } else if (status === Status.USER_HOME) {
    return (
      <div className="container mx-auto max-w-screen-md">
        <p>Welcome, {user}!</p>
        <StatusContext.Provider value={{ status, setStatus }}>
          <UserPosts handlePostClick={onClickViewPost}/>
        </StatusContext.Provider>
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
  } else if (status === Status.USER_VIEWING_POST) {
    return (
      <div className="container mx-auto max-w-screen-md">
        <SinglePost postHref={currentPost} />
        <PostContext.Provider value={{user:user, post: currentPost}}>
          <CommentForm />
        </PostContext.Provider>
        <PostContext.Provider value={currentPost}>
          <PostComments />
        </PostContext.Provider>
        <button
          type="button"
          onClick={onClickHome}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Back to Home
        </button>
      </div>
    );
  } else if (status === Status.USER_WRITING) {
    return (
      <div className="container mx-auto max-w-screen-md">
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
