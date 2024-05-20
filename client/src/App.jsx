import { useState, createContext } from 'react';
import './styles/App.css';
import SignupForm from './SignupForm';
import LoginForm from './LoginForm';
import Feed from './Feed';
import SinglePost from './SinglePost';
import CreatePost from './CreatePost';
import CommentForm from './CommentForm';
import PostComments from './PostComments';
import Navigation from './Navigation';
import Dashboard from './Dashboard';

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

  const onClickDashboard = () => {
    setStatus(Status.USER_DASHBOARD);
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
      <div>
        <SignupForm />
        <StatusContext.Provider value={{ status, setStatus }}>
          <LoginForm toggleUser={setUser} />
        </StatusContext.Provider>
      </div>
    );
  } else if (status === Status.USER_HOME) {
    return (
      <div>
        <Navigation
          onClickHome={onClickHome}
          onClickDashboard={onClickDashboard}
          onClickCreatePost={onClickCreatePost}
          onClickLogOut={logout}
        />
        <StatusContext.Provider value={{ status, setStatus }}>
          <Feed handlePostClick={onClickViewPost}/>
        </StatusContext.Provider>
      </div>
    );
  } else if (status === Status.USER_DASHBOARD) {
    return (
      <>
        <div>
          <Navigation
            onClickHome={onClickHome}
            onClickDashboard={onClickDashboard}
            onClickCreatePost={onClickCreatePost}
            onClickLogOut={logout}
          />
          <UserContext.Provider value={user}>
            <Dashboard handlePostClick={onClickViewPost}/>
          </UserContext.Provider>
        </div>
      </>
    );
  } else if (status === Status.USER_VIEWING_POST) {
    return (
      <div>
        <Navigation
          onClickHome={onClickHome}
          onClickDashboard={onClickDashboard}
          onClickCreatePost={onClickCreatePost}
          onClickLogOut={logout}
        />
        <SinglePost postHref={currentPost} />
        <PostContext.Provider value={{user:user, post: currentPost}}>
          <CommentForm />
        </PostContext.Provider>
        <PostContext.Provider value={currentPost}>
          <PostComments />
        </PostContext.Provider>
      </div>
    );
  } else if (status === Status.USER_WRITING) {
    return (
      <div>
        <Navigation
          onClickHome={onClickHome}
          onClickDashboard={onClickDashboard}
          onClickCreatePost={onClickCreatePost}
          onClickLogOut={logout}
        />
        <UserContext.Provider value={user}>
          <CreatePost />
        </UserContext.Provider>
      </div>
    );
  }
}

export default App;
