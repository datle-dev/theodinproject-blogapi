import { useState, useContext } from 'react';
import { UserContext } from './App';

export default function Dashboard ({ handlePostClick, handlePostEdit }) {
  const [isDashboardLoading, setIsDashboardLoading] = useState(true);
  const user = useContext(UserContext);
  const secret_token = JSON.parse(localStorage.getItem('jwtblog')).token;
  const [userPosts, setUserPosts] = useState(async () => {
    await fetch('http://localhost:3000/posts?username=' + user, {
      method: 'GET',
      mode: 'cors',
      headers: {
        Authorization: 'Bearer ' + secret_token,
      },
    })
      .then((res) => res.json())
      .then((resData) => {
        console.log(resData);
        setIsDashboardLoading(false);
        setUserPosts(resData);
        return;
      })
      .catch((err) => console.error(err));
  });

  const handlePostToggleDraft = async (e) => {
    let userPostsUpdated = [...userPosts];
    const postId = e.target.getAttribute('postid');
    const postIndex = userPosts.findIndex((post) => post._id === postId);
    userPostsUpdated[postIndex].draft = !userPostsUpdated[postIndex].draft;
    const draftStatus = userPostsUpdated[postIndex].draft;
    console.log(userPostsUpdated);
    console.log(userPostsUpdated[postIndex].draft);
    setUserPosts(userPostsUpdated);


    await fetch('http://localhost:3000/posts/' + postId, {
      method: 'PUT',
      mode: 'cors',
      headers: {
        'Authorization': 'Bearer ' + secret_token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        draft: userPostsUpdated[postIndex].draft,
        purpose: 'toggleDraft',
      }),
    })
      .then((res) => res.json())
      .then((resData) => {
        console.log(resData);
        return;
      })
      .catch((err) => console.error(err));
  };

  const handlePostDelete = (e) => {
    e.preventDefault();
    if (window.confirm('Do you want to delete this post?')) {
      console.log('delete post');
    }
  };

  if (isDashboardLoading) {
    return <p>Loading Dashboard...</p>;
  } else {
    return (
      <>
        <div>
          {userPosts.map((post) => {
            return (
              <article key={post._id}>
                <h2>
                  <a href={'http://localhost:3000/posts/' + post._id} onClick={handlePostClick}>{post.title}</a>
                </h2>
                <h3>{post.username}</h3>
                <button type="button" onClick={handlePostEdit}>Edit</button>
                <button type="button" onClick={handlePostToggleDraft} postid={post._id}>
                  {post.draft ? 'Publish' : 'Mark as Draft'} 
                </button>
                <button type="button" onClick={handlePostDelete}>Delete</button>
              </article>
            );
          })}
        </div>
      </>
    );
  }
};
