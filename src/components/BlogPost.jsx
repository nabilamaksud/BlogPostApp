import { useContext, useState } from "react";
import { BlogContext } from "../context/BlogContextProvider";
import { UserContext } from "../context/UserContext";
import Comments from "./Comments";
import { useNavigate } from "react-router-dom";
import "./BlogPost.css"

const BlogPost = ({ post }) => {
  const { currentUserInfo } = useContext(UserContext);
  const { blogPosts, addLike } = useContext(BlogContext);
  const [currentPost, setCurrentPost] = useState(
    blogPosts.find((blogPost) => blogPost.id === post.id)
  );
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(
    currentPost && currentPost.likedUserId ? currentPost.likedUserId.length : []
  );

  const navigate = useNavigate();

  if (!currentPost) {
    return <div>Post not found</div>;
  }

  const handleLike = (e) => {
    e.preventDefault();
    if (currentUserInfo.id === undefined) {
      alert("Please login to like");
      navigate("/login", { replace: true });
      return;
    }

    const alreadyLiked = currentPost.likedUserId.includes(currentUserInfo.id);
    const newLikeCount = alreadyLiked ? likeCount - 1 : likeCount + 1;

    setLiked(!liked);
    setLikeCount(newLikeCount);

    const updatedLikedUserIds = alreadyLiked ? currentPost.likedUserId.filter((id) => id !== currentUserInfo.id) : [...currentPost.likedUserId, currentUserInfo.id];

    addLike(currentPost.id, updatedLikedUserIds);
    setCurrentPost((prevPost) => (
      { ...prevPost, likedUserId: updatedLikedUserIds, }));
  };

  return (
    <div className="blog-post-container">
      <div className='blog_part1'>
        <h2 className='btitle'>{currentPost.title}</h2>

        <time className='btime' dateTime={currentPost.createdAt}>{'Created at: ' + currentPost.createdAt}</time>
        <h4 className='bauthor'>Author: {currentPost.author}</h4>
        <p className='bbody'>{currentPost.body}</p>
        <div className="like-container">
          <button className='blikeButton' onClick={handleLike}>
            <span style={liked ? { color: "red" } : { color: "grey" }}>❤</span>
          </button>
          <p className='blikeCount'>{likeCount} likes</p>
        </div>
      </div>
      <div className="blog_part2">
        <img
          className="bimg"
          src="https://picsum.photos/300"
          alt={currentPost.title}
        />
      </div>
      <Comments blogPost={currentPost} />
    </div>
  );
};

export default BlogPost;
