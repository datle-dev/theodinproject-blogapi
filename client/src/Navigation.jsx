export default function Navigation ({ onClickHome, onClickFeed, onClickYourPosts, onClickCreatePost, onClickLogOut }) {
  return (
    <>
      <nav>
        <button
          type="button"
          onClick={onClickHome}
        >
          Home
        </button>
        <button
          type="button"
          onClick={onClickFeed}
        >
          Feed
        </button>
        <button
          type="button"
          onClick={onClickYourPosts}
        >
          Your Posts
        </button>
        <button
          type="button"
          onClick={onClickCreatePost}
        >
          Create Post
        </button>
        <button
          type="button"
          onClick={onClickLogOut}
        >
          Log Out
        </button>
      </nav>
    </>
  );
};
