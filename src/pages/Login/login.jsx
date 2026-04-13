import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import '../Login/login.css';
import { useAuth } from '../../context/apiContext';

export default function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState();

  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(()=>{
    document.body.classList.add('login-bg');

    return () => {
      document.body.classList.remove('login-bg');
    }
  });

  async function handleLogin(e) {
    e.preventDefault();

    try {
      login(email, password);
      navigate("/home");
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="login-container">
      <div className="form-header">
        <h1>Login</h1>
      </div>

      <form onSubmit={handleLogin}>
        <div className="input-container">
          <input
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>


        <button className="submit" type="submit">Entrar</button>
      </form>
      <div className="signup">
        Não tem uma conta? <a href="#">Clique aqui</a>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}