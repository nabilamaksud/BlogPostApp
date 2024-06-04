/* eslint-disable react/no-unknown-property */
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from '../context/UserContext';
import './LoginPage.css';


const Register = () => {
    const [userName, setUserName] = useState('');
    const [name, setName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [error, setError] = useState("");
    const { signUp, setUserData } = useContext(UserContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await signUp(userEmail, userPassword);
            const newUser = userCredential.user;
            console.log(newUser.uid);
            const newID = newUser.uid

            await setUserData(newID, name, userName, userEmail, newUser);
            navigate('/profile', { replace: true });
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="login-container">
            <h1>Register:</h1>
            {error && <p>{error}</p>}
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name:</label>
                <input name="name" value={name} type="text" onChange={(e) => setName(e.target.value)} required /><br />
                <label htmlFor="userName">Username:</label>
                <input name="userName" value={userName} type="text" onChange={(e) => setUserName(e.target.value)} required /><br />
                <label htmlFor="userEmail">Email:</label>
                <input name="userEmail" value={userEmail} type="email" onChange={(e) => setUserEmail(e.target.value)} required /><br />
                <label htmlFor="userPass">Password:</label>
                <input name="userPass" value={userPassword} type="password" onChange={(e) => setUserPassword(e.target.value)} required /><br />
                <button type="submit">Submit</button>
            </form>
            <Link to="/login">Already registered</Link>
        </div>
    );
};

export default Register;
