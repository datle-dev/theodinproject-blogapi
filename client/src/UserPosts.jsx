import { useState, useContext } from 'react';
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
        <div className="flex flex-col gap-2 m-2">
          <h1 className="text-3xl font-bold">Mapped Posts</h1>
          {posts.posts.map((post) => {
            return (
              <article className="border rounded p-2" key={post._id}>
                <h2 className="text-xl font-bold">
                  <a href={'http://localhost:3000/posts/' + post._id} onClick={handlePostClick}>{post.title}</a>
                </h2>
                <h3 className="text-l font-bold">{post.username}</h3>
              </article>
            );
          })}
        </div>
      </>
    );
  }
};
