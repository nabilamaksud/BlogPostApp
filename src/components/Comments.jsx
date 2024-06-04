import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { BlogContext } from '../context/BlogContextProvider';
import "./Comments.css"

const Comments = ({ blogPost }) => {
  const [comments, setComments] = useState(blogPost.comments ? blogPost.comments : []);
  const [editingComment, setEditingComment] = useState(null);
  const [newComment, setNewComment] = useState('');
  const { currentUserInfo, user } = useContext(UserContext);
  const { updateBlogPost } = useContext(BlogContext);


  useEffect(() => {
    const storedComments = localStorage.getItem(`${blogPost.comments}`);
    if (storedComments) {
      setComments(JSON.parse(storedComments));
    }
  }, [blogPost]);

  useEffect(() => {
    localStorage.setItem(`comments_${blogPost.id}`, JSON.stringify(comments));
  }, [comments, blogPost.id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (newComment.trim() !== '') {
      const comment = {
        id: Date.now(),
        content: newComment.trim(),
        author: currentUserInfo.name
      };
      const updatedComments = [...comments, comment];
      setComments(prevComments => [...prevComments, comment]);
      updateBlogPost(blogPost.id, { ...blogPost, comments: updatedComments });
      setNewComment('');
    }
  };

  const handleDelete = (commentId) => {
    const updatedComments = comments.filter(comment => comment.id !== commentId);
    setComments(updatedComments);
    updateBlogPost(blogPost.id, { ...blogPost, comments: updatedComments });
  };
  const handleEdit = (comment) => {
    setEditingComment(comment);
    setNewComment(comment.content);
  };

  const handleUpdate = (event) => {
    event.preventDefault();
    if (newComment.trim() !== '') {
      const updatedComment = { ...editingComment, content: newComment.trim() };
      const updatedComments = comments.map(comment =>
        comment.id === editingComment.id ? updatedComment : comment
      );
      setComments(updatedComments);
      updateBlogPost(blogPost.id, { ...blogPost, comments: updatedComments });
      setEditingComment(null);
      setNewComment('');
    }
  };
  return (
    <div className="comments-container">
      <label>Comments:</label>
      {comments.map((comment) => (
        <div className="comment" key={comment.id}>
          <strong>{comment.author}: </strong>
          <span className="comment-content">{comment.content}</span>
          {user ? (currentUserInfo.name === comment.author && (
            <>
              <button className="comment-edit" onClick={() => handleEdit(comment)}>
                Edit
              </button>
              <button className="comment-delet" onClick={() => handleDelete(comment.id)}>
                Delete
              </button>
            </>
          )) : (<span></span>)}
        </div>
      ))}
      {user ? (editingComment ? (
        <form className="comment-form" onSubmit={handleUpdate}>
          <textarea className="inputfield" value={newComment} onChange={(e) => setNewComment(e.target.value)} />
          <button type="submit">Update Comment</button>
        </form>
      ) : (
        <form className="comment-form" onSubmit={handleSubmit}>
          <textarea className="inputfield" value={newComment} onChange={(e) => setNewComment(e.target.value)} />
          <button type="submit">Add Comment</button>
        </form>
      )) : (
        <p className='comment-login-warn' ><i>Please Login to Comment</i></p>
      )}
    </div>
  );
};

export default Comments;