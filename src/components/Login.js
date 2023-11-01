export function LoginButton({ toggleLoginModal }) {
  return <button onClick={toggleLoginModal}>Login</button>;
}

export function LoginPopup({ isLoginModalOpen }) {
  return (
    <section id="login-popup" className={isLoginModalOpen ? "" : "no-display"}>
      <h2>Login</h2>
      <form method="post">
        <label>Email</label>
        <input type="email"></input>
        <label>Password</label>
        <input type="password"></input>
        <button type="submit">Log in</button>
      </form>
    </section>
  );
}
