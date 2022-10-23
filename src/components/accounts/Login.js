import React from "react";
import useInputState from "../../hooks/inputHook";
import useAuthState from "../../hooks/authHook";
import "../../css/login.css";
import { Link, Navigate } from "react-router-dom";

function Login() {
  const { auth, login } = useAuthState();
  const [username, setUsername, resetUsername] = useInputState("");
  const [password, setPassword, resetPassword] = useInputState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    login(username, password);
    resetUsername();
    resetPassword();
  };
  if (auth.isAuthenticated) {
    return <Navigate to="/" />;
  }
  return (
    <div className="login-form-div">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="login-form-group">
          <label>Username</label>
          <input type="text" value={username} onChange={setUsername} />
        </div>
        <div className="login-form-group">
          <label>Password</label>
          <input type="password" value={password} onChange={setPassword} />
        </div>
        <div className="login-submit">
          <input type="submit" value="Login" />
        </div>
      </form>
      <div className="reg-red">
        <p>
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
