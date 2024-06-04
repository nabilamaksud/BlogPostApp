import { createContext, useState, useEffect } from 'react';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut
} from 'firebase/auth';
import { auth, firebaseDb } from '../firebase';
import { setDoc, doc, getDoc } from 'firebase/firestore';

export const UserContext = createContext();



const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [currentUserInfo, setCurrentUserInfo] = useState("")
    useEffect(() => {
        const fetchUserData = async () => {
            if (user) {
                try {
                    const userDoc = await getDoc(doc(firebaseDb, 'Users', user.uid));
                    if (userDoc.exists()) {
                        setCurrentUserInfo(userDoc.data());
                    }
                } catch (error) {
                    console.error("Error fetching user data:", error);
                }
            }
        };

        fetchUserData();
    }, [user]);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    useEffect(() => {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
        } else {
            localStorage.removeItem('user');
        }
    }, [user]);

    const updateUser = (newUserData) => {
        setUser(newUserData);
    };

    const signUp = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    };

    const logout = () => {
        return signOut(auth);
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            console.log(currentUser);
        });

        return () => {
            unsubscribe();
        };
    }, []);

    const setUserData = (id, name, userName, email, user) => {
        return setDoc(doc(firebaseDb, "Users", user.uid), {
            id: id,
            email: email,
            username: userName,
            name: name,
            role: 'user',
        });
    };

    const value = {
        user,
        updateUser,
        login,
        logout,
        signUp,
        setUserData,
        currentUserInfo,

    };

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContextProvider;
