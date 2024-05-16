import { useState } from "react";
import Markdown from 'react-markdown';

export default function SinglePost({ postHref }) {
  const [isPostLoading, setIsPostLoading] = useState(true);
  const secret_token = JSON.parse(localStorage.getItem('jwtblog')).token;

  const [post, setPost] = useState(async () => {
    setIsPostLoading(true);
    await fetch(postHref, {
      method: 'GET',
      mode: 'cors',
      headers: {
        Authorization: 'Bearer ' + secret_token,
      },
    })
      .then((res) => res.json())
      .then((resData) => {
        setPost(resData);
        setIsPostLoading(false);
        return;
      })
      .catch((err) => console.error(err));
  });

  if (isPostLoading) {
    return <p>Loading...</p>;
  } else {
    return (
      <>
        <div>
          <h1>{post.title}</h1>
          <h2>{post.date_formatted}</h2>
          <h2>{post.username}</h2>
          <Markdown>
            {post.text}
          </Markdown>
          </div>
      </>
    );
  }
}
