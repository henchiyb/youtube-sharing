const Header = () => {
  const login = () => {
    console.log("login");
  };

  return (
    <>
      Funny Movies
      <button className="btn" onClick={login}>
        Login
      </button>
    </>
  );
};

export default Header;
