export default function Navigation ({ onClickHome, onClickYourPosts, onClickCreatePost, onClickLogOut }) {
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
