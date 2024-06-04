import { useContext, useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import SearchBar from './SearchBar';
import './NavBar.css';
import logo from '../assets/thoughts_8392703.png';
import { Link } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { firebaseDb } from '../firebase';

const NavBar = () => {
    const { user, logout } = useContext(UserContext);
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            if (user) {
                try {
                    const userDoc = await getDoc(doc(firebaseDb, 'Users', user.uid));
                    if (userDoc.exists()) {
                        setUserData(userDoc.data());
                    }
                } catch (error) {
                    console.error("Error fetching user data:", error);
                }
            }
        };

        fetchUserData();
    }, [user]);

    return (
        <nav>
            <div className='logo-container'>
                <img src={logo} className='logo' alt='logo' />
                <span className='logo-text'>ScribbledSpectrum</span>
            </div>
            <SearchBar className="seachbar" />
            <ul type="none" className='Navlinks'>
                <li>
                    <NavLink to="/">Home</NavLink>
                </li>
                {!user ? (
                    <li>
                        <NavLink to="/login">Login</NavLink>
                    </li>
                ) : (
                    <>
                        <li>
                            <NavLink to="/profile">{userData ? userData.username : user.email}</NavLink>
                        </li>
                        <li>
                            <Link className='signOut' onClick={logout}>Sign out</Link>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default NavBar;
