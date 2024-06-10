import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { addCommentToPost, addLikeToPost, getAllPosts } from "../services/postServices";
import { getUser } from "../services/userServices";

export const PostList = ({ setToken, token }) => {
    const [user, setUser] = useState({});
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (token) {
                    const userData = await getUser();
                    console.log("User Data:", userData);
                    setUser(userData);
                    setIsLoading(false); 
                }
            } catch (error) {
                console.error("Error fetching data:", error);
                setIsLoading(false); 
            }
        };
        fetchData();
    }, [token]);
    

    useEffect(() => {
        getAllPosts().then(postsArray => {
            setPosts(postsArray);
            setIsLoading(false);
        });
    }, []);

    return (
        <main className="bg-gradient-to-b from-blue-500 to-purple-500 min-h-screen">
            <h1 className="text-center text-5xl font-semibold mb-4 text-white">Post List</h1>
            {isLoading ? (
                <h3 className="text-white text-center">Loading Posts...</h3>
            ) : (
                <div className="mx-auto max-w-lg">
                    {posts.map(post => (
                        <div key={post.id} className="my-4 p-4 border rounded">
                            <h3>PetUser #: {post.pet_user.id}</h3>
                            {user && <h3>User Name: {user.username}</h3>}
                            {/* <h3>User Name: {user.username}</h3> */}
                            <h2 className="text-lg font-semibold">{post.description}</h2>
                            <p>Start Date: {post.sitStartDate}</p>
                            <p>End Date: {post.sitEndDate}</p>
                            <p>City: {post.pet_user.city}</p>
                            <div className="flex justify-between items-center mt-4">
                                <Link to={`/postLists/${post.id}`} className="text-blue-800">
                                    View Details
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </main>
    );
};
