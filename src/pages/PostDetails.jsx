import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPostById } from "../services/postServices";

export const PostDetail = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const navigate = useNavigate();

  const handleContact = () => {
    if (post && post.pet_user && post.pet_user.email) {
      const email = post.pet_user.email;
      window.open(`mailto:${email}`, "_blank");
    } else {
      console.error("No email found for the poster");
    }
  };

  useEffect(() => {
    getPostById(postId).then((post) => {
      setPost(post);
    });
  }, [postId]);

  const handleEdit = () => {
    navigate(`/edit-post/${postId}`);
  };

  return (
    <>
      <div className="my-8 bg-gray-400 p-6 rounded-lg shadow-lg max-w-md mx-auto">
        {post ? (
          <>
            <div className="mb-4" key={post.id}>
              <div className="text-xl font-bold">City: {post.pet_user.city}</div>
              <div>Description: {post.description}</div>
              <div>Sit Start Date: {post.sitStartDate}</div>
              <div>Sit End Date: {post.sitEndDate}</div>
            </div>
          </>
        ) : (
          <p>No post found.</p>
        )}
         <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-300"
            onClick={handleContact}
          >
            Contact
          </button>
        <div className="button-div mt-4 flex space-x-4 items-center justify-center">
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
    </>
  );
};