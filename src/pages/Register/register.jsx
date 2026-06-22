import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import '../Register/register.css';
import { useAuth } from '../../context/apiContext';

export default function Register() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState();

  const navigate = useNavigate();
  const { register } = useAuth();

  useEffect(()=>{
    document.body.classList.add('login-bg');

    return () => {
      document.body.classList.remove('login-bg');
    }
  }, []);

  async function handleRegister(e) {
    e.preventDefault();

    try {
      await register(name, email, password);
      navigate("/home");
    } catch (err) {
      const apiErrorData = err.response?.data;
      if (apiErrorData?.error && typeof apiErrorData.error === 'object') {
        const messages = Object.values(apiErrorData.error).flat();
        setError(messages.join(", "));
      } else {
        setError(apiErrorData?.message || err.message || "An error occurred during registration.");
      }
    }
  }

  return (
    <div className="login-container">
      <div className="form-header">
        <h1>Create Account</h1>
        <p className="text-gray-500 text-sm">Enter your details</p>
      </div>

      <form onSubmit={handleRegister}>
        <div className="input-container">
          <input
            placeholder="Name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
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


        <button className="submit" type="submit">Registrar</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div className="signup">
        Já tem uma conta? <a onClick={() => navigate("/")}>Clique aqui</a>
      </div>

      
    </div>
  );
}
