import { useState } from "react";

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
          <p>{post.post.title}</p>
          <p>{post.post.date}</p>
          <p>{post.post.text}</p>
          <p>{JSON.stringify(post)}</p>
        </div>
      </>
    );
  }
}
