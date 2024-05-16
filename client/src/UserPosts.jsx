mport { useState, useContext } from 'react';
import { UserContext } from './App';

export default function UserPosts ({ handlePostClick }) {
  const [isPostsLoading, setIsPostsLoading] = useState(true);
  const user = useContext(UserContext);
  const secret_token = JSON.parse(localStorage.getItem('jwtblog')).token;
  const [posts, setPosts] = useState(async () => {
    await fetch('http://localhost:3000/posts', {
      method: 'GET',
      mode: 'cors',
      headers: {
        Authorization: 'Bearer ' + secret_token,
      },
    })
      .then((res) => res.json())
      .then((resData) => {
        setIsPostsLoading(false);
        setPosts(resData);
        return;
      })
      .catch((err) => console.error(err));
  });

  if (isPostsLoading) {
    return <p>Loading...</p>;
  } else {
    return (
      <>
        <div>
          {posts.posts.map((post) => {
            return (
              <article>
                <h2>
                  <a href={'http://localhost:3000/posts/' + post._id} onClick={handlePostClick}>{post.title}</a>
                </h2>
                <h3>{post.username}</h3>
              </article>
            );
          })}
        </div>
      </>
    );
  }
};
