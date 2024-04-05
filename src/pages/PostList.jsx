import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { addCommentToPost, getAllPosts } from "../services/postServices";
import { getUserById } from "../services/userServices";

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

    // const handleAddLike = async (postId) => {
    //     // Call the service function to add a like to the post
    //     await addLikeToPost(postId);
    //     // Refresh posts after adding like
    //     getAllPosts().then(postsArray => {
    //         setPosts(postsArray);
    //     });
    // };

    return (
        <>
            <h1 className="text-3xl">Post List</h1>
            {isLoading ? (
                <h3>Loading Posts...</h3>
            ) : (
                <div>
                    {posts.map(post => (
                        <div key={post.id} className="my-4 p-4 border rounded">
                            <h2 className="text-lg font-semibold">{post.description}</h2>
                            <p>Start Date: {post.sitStartDate}</p>
                            <p>End Date: {post.sitEndDate}</p>
                            {/* <p>Owner: {user ? user.username : 'Unknown'}</p> */}
                            {/* <p>Owner: {post.user.username}</p> */}
                            <p>City: {post.pet_user.city}</p>
                            <button 
                             className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-300"
                            onClick={() => handleAddLike(post.id)}>Like</button>
                           
                            
                            <Link to={`/posts/${post.id}`} className="text-blue-500">
                                View Details
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
};