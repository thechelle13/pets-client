import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { addCommentToPost, addLikeToPost, getAllPosts } from "../services/postServices";


export const PostList = ({ setToken, token }) => {
    // const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getAllPosts().then(postsArray => {
            setPosts(postsArray);
            setIsLoading(false);
        });
    }, []);

    const handleAddComment = async (postId, commentText) => {
        // Call the service function to add a comment to the post
        await addCommentToPost(postId, commentText);
        // Refresh posts after adding comment
        getAllPosts().then(postsArray => {
            setPosts(postsArray);
        });
    };

    const handleAddLike = async (postId) => {
        // Call the service function to add a like to the post
        await addLikeToPost(postId);
        // Refresh posts after adding like
        getAllPosts().then(postsArray => {
            setPosts(postsArray);
        });
    };

    return (
        <>
            <h1 className="text-3xl text-center mb-4">Post List</h1>
            {isLoading ? (
                <h3>Loading Posts...</h3>
            ) : (
                <div>
                    {posts.map(post => (
                        <div key={post.id} className="my-4 p-4 border rounded">
                            <h2 className="text-lg font-semibold">{post.description}</h2>
                            <p>Start Date: {post.sitStartDate}</p>
                            <p>End Date: {post.sitEndDate}</p>
                          
                            {/* <p>Owner: {post.petuser.user.username}</p> */}
                            <p>City: {post.pet_user.city}</p>
                            <div className="flex items-center justify-between">
                            <button 
                                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-300 flex items-center space-x-1"
                                    onClick={() => handleAddLike(post.id)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v14m0-14l-4 4m4-4l4 4M5 12h14"/>
                                    </svg>
                                    <span>Like</span>
                                </button>
                                <Link to={`/posts/${post.id}`} className="text-blue-800">
                                    View Details
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
};