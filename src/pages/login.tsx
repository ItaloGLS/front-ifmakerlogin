import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../auth';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/paineldecontrole');
    } catch (error) {
      setError('Login failed');
    }
  };

  return (
    <div className="login">
      <div className='cardlogin'>
        <h2>Login - Painel de Controle</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
          {error && <p>{error}</p>}
      </form>
      </div>
    </div>
  );
};

export default Login;