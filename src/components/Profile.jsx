import { useContext, useState, useEffect } from 'react';
import { UserContext } from '../context/UserContext';
import { BlogContext } from '../context/BlogContextProvider';
import { doc, getDoc } from 'firebase/firestore';
import { firebaseDb } from '../firebase';
import './Profile.css';


const Profile = () => {
    const { user } = useContext(UserContext);
    const [userData, setUserData] = useState(null);
    const [titlex, setTitle] = useState('');
    const [bodyx, setBody] = useState('');
    const { addBlogPost } = useContext(BlogContext);
    const [idCount, setId] = useState(4);

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

    const handleSubmit = (event) => {
        event.preventDefault();

        const currDate = new Date().toLocaleDateString();
        const currTime = new Date().toLocaleTimeString();
        const dateString = currDate + " at " + currTime;
        const newId = idCount + 1;
        const newBlogPost = {
            id: newId,
            title: titlex,
            body: bodyx,
            author: userData ? userData.name : '',
            likedUserId: [],
            createdAt: dateString,
        };

        setId(newId);
        addBlogPost(newBlogPost);

        setTitle('');
        setBody('');
    };

    return (
        <div className="profile-container">
            {userData && (
                <>
                    <h1>Hi {userData.name}
                        <br />
                        Write your thoughts
                    </h1>

                    <p>{userData.email}</p>
                    <form onSubmit={handleSubmit}>
                        <label>Title:</label>
                        <input type="text" value={titlex} onChange={(e) =>
                            setTitle(e.target.value)} />
                        <br />
                        <label>Body:</label>
                        <textarea value={bodyx} onChange={(e) => setBody(e.target.value)} />
                        <br />
                        <button type="submit">Insert Blog Post</button>
                    </form>
                </>
            )}
        </div>
    );
};

export default Profile;
