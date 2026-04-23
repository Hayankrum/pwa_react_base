import "./login.css";

export default function Login() {
  return (
    <div className="login-wrapper">
      <div className="login-card">

        <div className="login-header">
          <h2>Log in</h2>
          <p>Proceed to Admin Panel</p>
        </div>

        <input type="text" placeholder="Username" />
        <input type="password" placeholder="Password" />

        <span className="forgot">Forgot password?</span>

        <button>Log in</button>

        <p className="register">
          New here? <span>Request access</span>
        </p>

      </div>
    </div>
  );
}