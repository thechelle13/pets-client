import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getPostById, updatePost } from "../services/postServices";

export const PostDetail = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [commentText, setCommentText] = useState(""); 
  const [isCommenting, setIsCommenting] = useState(false); 
  const [isEditing, setIsEditing] = useState(false);
  const [editedPostInfo, setEditedPostInfo] = useState({
    description: "",
    sitStartDate: "",
    sitEndDate: "",
    likes: 0,
  });
  const [savingChanges, setSavingChanges] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    getPostById(postId).then((post) => {
      setPost(post);
      setEditedPostInfo({
        description: post.description,
        sitStartDate: post.sitStartDate,
        sitEndDate: post.sitEndDate,
        likes: post.likes,
      });
    });
  }, [postId]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      setSavingChanges(true);
      await updatePost(postId, editedPostInfo);
      setPost((prevPost) => ({ ...prevPost, ...editedPostInfo }));
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating post:", error);
    } finally {
      setSavingChanges(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);

  };

  const handleAddComment = () => {
    console.log("Comment added:", commentText);
    setCommentText("");
    setIsCommenting(false); 
  };

  const toggleCommenting = () => {
    setIsCommenting(!isCommenting);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedPostInfo({ ...editedPostInfo, [name]: value });
  };

  return (
    <div className="mx-auto max-w-md">
      <div className="mt-4 text-center">
        <h1 className="text-blue-900">Post</h1>
      </div>
      <div className="my-4 p-4 border rounded">
        {isEditing ? (
           <form>
           <div className="mb-4">
             <label htmlFor="description" className="block font-bold mb-2">Description:</label>
             <input type="text" name="description" id="description" value={editedPostInfo.description} onChange={handleInputChange} className="border border-gray-300 rounded-md px-4 py-2 w-full" />
           </div>
           <div className="mb-4">
             <label htmlFor="sitStartDate" className="block font-bold mb-2">Sit Start Date:</label>
             <input type="text" name="sitStartDate" id="sitStartDate" value={editedPostInfo.sitStartDate} onChange={handleInputChange} className="border border-gray-300 rounded-md px-4 py-2 w-full" />
           </div>
           <div className="mb-4">
             <label htmlFor="sitEndDate" className="block font-bold mb-2">Sit End Date:</label>
             <input type="text" name="sitEndDate" id="sitEndDate" value={editedPostInfo.sitEndDate} onChange={handleInputChange} className="border border-gray-300 rounded-md px-4 py-2 w-full" />
           </div>
         </form>
        ) : (
          <>
            <div className="mb-4">
              <div className="text-xl font-bold">City: {post?.pet_user?.city}</div>
              <div>Description: {post?.description}</div>
              <div>Sit Start Date: {post?.sitStartDate}</div>
              <div>Sit End Date: {post?.sitEndDate}</div>
              <div>Post Likes: {post?.likes}</div>
            </div>
          </>
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
          {post?.is_owner && (
            <>
              {isEditing ? (
               <>
               <button
                 className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-blue-700"
                 onClick={handleSave}
                 disabled={savingChanges}
               >
                 {savingChanges ? "Saving..." : "Save"}
               </button>
               <button
                 className="bg-gray-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-gray-700"
                 onClick={handleCancel}
               >
                 Cancel
               </button>
             </>
              ) : (
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-blue-700"
                  onClick={handleEdit}
                >
                  Edit
                </button>
              )}
            </>
          )}
        </div>
      </div>
      <div className="mt-4 text-center">
        <Link to="/postLists" className="text-blue-900 hover:underline">Back to Posts</Link>
      </div>
    </div>
  );
};
