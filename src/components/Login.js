export function LoginButton() {
  return <button>Login</button>;
}

export function LoginPopup() {
  return (
    <section id="login-popup" className="no-display">
      <div>Login</div>
      <div>Email</div>
      <input type="email"></input>
      <div>Password</div>
      <input type="password"></input>
    </section>
  );
}
