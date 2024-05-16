import { useState, useContext } from 'react';
import { PostContext } from './App';

export default function PostComments () {
  const [isCommentsLoading, setIsCommentsLoading] = useState(true);
  const secret_token = JSON.parse(localStorage.getItem('jwtblog')).token;
  const post = useContext(PostContext);

  const [comments, setComments] = useState(async () => {
    await fetch(post + '/comments', {
      method: 'GET',
      mode: 'cors',
      headers: {
        Authorization: 'Bearer ' + secret_token,
      },
    })
      .then((res) => res.json())
      .then((resData) => {
        setIsCommentsLoading(false);
        setComments(resData);
        return;
      })
      .catch((err) => console.error(err));
  });

  if (isCommentsLoading) {
    return <p>Loading comments...</p>;
  } else {
    return (
      <>
        <div>
          {comments.comments.map((comment) => {
            return (
              <article key={comment._id}>
                <p>{comment.username}</p>
                <p>{comment.date_formatted}</p>
                <p>{comment.text}</p>
              </article>
            );
          })}
        </div>
      </>
    );

  }
};
