import { useState, useContext } from 'react';
import { UserContext } from './App';

export default function Dashboard () {
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

  const handlePostClick = (e) => {
    e.preventDefault();
    console.log('post clicked');
    console.log(`user: ${user}`)
  };

  if (isDashboardLoading) {
    return <p>Loading Dashboard...</p>;
  } else {
    return (
      <>
        <div>
          {userPosts.posts.map((post) => {
            return (
              <article key={post._id}>
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
