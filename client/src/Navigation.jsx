export default function Navigation ({ onClickHome, onClickDashboard, onClickCreatePost, onClickLogOut }) {
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
          onClick={onClickDashboard}
        >
          Dashboard
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
