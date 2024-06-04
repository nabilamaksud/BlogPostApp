import { createContext, useState, useEffect } from 'react';

export const BlogContext = createContext();

const initialState = [
  {
    id: 1,
    title: 'First Blog Post',
    body: 'This is the body of the first blog post.',
    author: 'John Doe',
    createdAt: "5/14/2024 at 12:44:41 AM",
    likedUserId: [1, 2],
    comments: [{ author: "Jane Doe", content: "well done" }, { author: "Jane Doe", content: "well done" }]
  },
  {
    id: 2,
    title: 'Second Blog Post',
    body: 'This is the body of the second blog post.',
    author: 'Jane Doe',
    createdAt: "5/14/2024 at 12:44:41 AM",
    likedUserId: [1, 2],
    comments: [{ author: "Jane Doe", content: "well done" }, { author: "Jane Doe", content: "well done" }]


  },
];

const BlogContextProvider = ({ children }) => {
  const [blogPosts, setBlogPosts] = useState(initialState);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const storedBlog = localStorage.getItem('blogPosts');
    if (storedBlog) {
      setBlogPosts(JSON.parse(storedBlog));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('blogPosts', JSON.stringify(blogPosts));
  }, [blogPosts]);

  const addBlogPost = (newBlogPost) => {
    setBlogPosts((prevBlogPosts) => [...prevBlogPosts, newBlogPost]);
  };

  const updateBlogPost = (blogPostId, updatedBlogPost) => {
    setBlogPosts((prevBlogPosts) =>
      prevBlogPosts.map((blogPost) =>
        blogPost.id === blogPostId ? updatedBlogPost : blogPost
      )
    );
  };

  const addLike = (currentPostId, updatedBlogPost) => {
    setBlogPosts(prevBlogPosts =>
      prevBlogPosts.map(blogPost => blogPost.id === currentPostId ? { ...blogPost, likedUserId: updatedBlogPost } : blogPost)
    );
  };

  const value = {
    blogPosts,
    currentUser,
    addBlogPost,
    updateBlogPost,
    setCurrentUser,
    addLike
  };

  return (
    <BlogContext.Provider value={value}>
      {children}
    </BlogContext.Provider>
  );
};

export default BlogContextProvider;
