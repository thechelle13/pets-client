import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getPostById } from "../services/postServices";

export const PostDetail = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [commentText, setCommentText] = useState(""); 
  const [isCommenting, setIsCommenting] = useState(false); 
  const navigate = useNavigate();

  // const handleContact = () => {
  //   if (post && post.pet_user && post.pet_user.email) {
  //     const email = post.pet_user.email;
  //     window.open(`mailto:${email}`, "_blank");
  //   } else {
  //     console.error("No email found for the poster");
  //   }
  // };

  useEffect(() => {
    getPostById(postId).then((post) => {
      setPost(post);
    });
  }, [postId]);

  const handleEdit = () => {
    
  };

  const handleAddComment = () => {
    console.log("Comment added:", commentText);
    setCommentText("");
    setIsCommenting(false); 
  };

  const toggleCommenting = () => {
    setIsCommenting(!isCommenting);
  };


  const handlePostEdit = () => {
    setIsEditing(true);
    
  };

  const handleInputChange = (e) => {
   
     
      setEditedPostInfo();
    
  };

  const saveChanges = async () => {
   
  };

  return (
    <div className="mx-auto max-w-md">
      <div className="mt-4 text-center">
        <h1 className="text-blue-900">Post</h1>
      </div>
      <div className="my-4 p-4 border rounded">
        {post ? (
          <>
            <div className="mb-4">
              <div className="text-xl font-bold">City: {post.pet_user.city}</div>
              <div>Description: {post.description}</div>
              <div>Sit Start Date: {post.sitStartDate}</div>
              <div>Sit End Date: {post.sitEndDate}</div>
            </div>
          </>
        ) : (
          <p>No post found.</p>
        )}
        {!isCommenting && ( 
          <button 
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-300"
            onClick={toggleCommenting} 
          >
            Comment
          </button>
        )}
        {isCommenting && ( 
          <>
            <textarea
              className="mt-2 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              rows="3"
              placeholder="Add a comment"
              value={commentText} 
              onChange={(e) => setCommentText(e.target.value)}
            />
            <div className="mt-2 flex justify-between">
              <button 
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-700 focus:outline-none focus:ring focus:border-gray-300"
                onClick={toggleCommenting}
              >
                Cancel
              </button>
              <button 
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-300 ml-2"
                onClick={handleAddComment}
              >
                Add Comment
              </button>
              
            </div>
            
          </>
        )}
        <div className="mt-4 flex justify-center">
          {post && post.is_owner && (
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-blue-700"
              onClick={handleEdit}
            >
              Edit
            </button>
          )}
        </div>
      </div>
      <div className="mt-4 text-center">
        <Link to="/postLists" className="text-blue-900 hover:underline">Back to Posts</Link>
      </div>
    </div>
  );
};
