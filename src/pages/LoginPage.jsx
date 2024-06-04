// src/pages/LoginPage.jsx
import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import './LoginPage.css'

const LoginPage = () => {
    const [userEmail, setUserEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState("");

    const { login } = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await login(userEmail, password);
            navigate('/profile', { replace: true });
        } catch (err) {
            setError(err.message)
        }
    };

    return (
        <div className='login-container'>
            <h1>Login</h1>
            {error && <p>{error}</p>}
            <form onSubmit={handleLogin}>
                <label>User Email:</label>
                <input type="email" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} required />
                <br />
                <label>Password:</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <br />
                <button type="submit">Login</button>
                <Link to="/register">New User ?</Link>
            </form>
        </div>
    );
};

export default LoginPage;