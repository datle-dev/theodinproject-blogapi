import { useState, useContext } from 'react';
import { UserContext } from './App';
import Markdown from 'react-markdown';

export default function UserPosts () {
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
        console.log(resData);
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
        <h1>Mapped Posts</h1>
        {posts.posts.map((post) => {
          return <Markdown>{post.text}</Markdown>;
        })}
        <h2>JSON Response</h2>
        {JSON.stringify(posts)}
      </>
    );
  }
};
