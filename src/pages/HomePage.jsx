import { useContext } from 'react';
import BlogPost from '../components/BlogPost';
import { BlogContext } from '../context/BlogContextProvider';
import "./HomePage.css"

const HomePage = () => {
    const { blogPosts } = useContext(BlogContext);

    return (

        <div className="home-page">
            {blogPosts.map((post) => (
                <BlogPost key={post.id} post={post} />
            ))}
        </div>
    );
};

export default HomePage;
