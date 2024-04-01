import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllPosts } from "../services/postServices";

export const PostList = ({ setToken, token }) => {
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getAllPosts().then(postsArray => {
            setPosts(postsArray);
            setIsLoading(false);
        });
    }, []);

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
                            {/* <p>Owner: {post.user.petuser.username}</p> */}
                            <p>City: {post.pet_user.city}</p>
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
