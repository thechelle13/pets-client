import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getUser } from "../services/userServices";
import { getAllPosts } from "../services/postServices";
import { getUserPets } from "../services/petServices";

import emma from "../assets/emma.png";
import purrscilla from "../assets/purrscilla.png";

export const Home = ({ token }) => {

  const [user, setUser] = useState({});
  const [userPosts, setUserPosts] = useState([]);
  const [userPets, setUserPets] = useState([]);
  
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (token) {
          const userData = await getUser();
          console.log("User data:", userData);
          setUser(userData);
          
          const posts = await getAllPosts();
          setUserPosts(posts.filter((post) => post.is_owner === true));
  
          const pets = await getUserPets();
          const userOwnedPets = pets.filter((pet) => pet.userId === userData.id);
          setUserPets(userOwnedPets);
  
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
        setLoadingUser(false); // Also set loadingUser to false in case of error
      }
    };
    fetchData();
  }, [token]);
  

  return (
    <main className="bg-gradient-to-b from-blue-500 to-purple-500 h-full">
    <div className="bg-gradient-to-b from-blue-200 to-blue-800 text-center my-8 p-6 rounded-lg shadow-lg max-w-md mx-auto">
      <h1 className="text-5xl font-semibold mb-4 text-white">Welcome to Community Pets</h1>
      <div className="user-info-container bg-gray-500 p-6 rounded-md shadow-md">
     
            <div className="mb-2">
  <h2 className="text-3xl font-semibold text-black">
    {user.length > 0 && `${user[0].first_name} ${user[0].last_name}`}
  </h2>
  <p className="text-blue-800 mb-2">{user.length > 0 && user[0].email}</p>
  <Link to="/edit-user" className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-700">Edit Profile</Link>
</div>
          
        </div>
      </div>
  
    <div className="container mx-auto mt-8 max-w-md">
      <h1 className="text-3xl text-blue-800 font-semibold mb-4 text-center">My Posts</h1>
       <img src={purrscilla} alt="Purrscilla" className="w-36 h-36 mr-4 ml-2" style={{ marginBottom: "-30px" }}/>
      {loading ? (
        <p className="text-xl font-semibold mb-4 text-center">Loading...</p>
      ) : userPosts.length ? (
        userPosts.map((post) => (
          <Link key={post.id} to={`/postLists/${post.id}`}>
            <div className="bg-gray-100 rounded-md p-4 mb-4">
              <div className="text-xl font-semibold">Description: {post.description}</div>
            </div>
          </Link>
        ))
      ) : (
        <p className="text-xl font-semibold mb-4 text-center">No posts found.</p>
      )}
      <div className="flex justify-center">
        <Link to="/add-post" className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-700">Add Post</Link>
      </div>
    </div>
  
    <div className="container mx-auto mt-8 max-w-md">
      <h1 className="text-3xl text-blue-800 font-semibold mb-4 text-center">My Pets</h1>
      <img src={emma} alt="Emma" className="w-36 h-36 ml-4 mr-2" style={{ marginBottom: "-50px" }} />
      {loading ? (
        <p className="text-xl font-semibold mb-4 text-center">Loading...</p>
      ) : userPets.length ? (
        userPets.map((pet) => (
          <Link key={pet.id} to={`/pets/${pet.id}`}>
            <div className="bg-gray-100 rounded-md p-4 mb-4">
              <div className="text-xl font-semibold"># {pet.id}</div>
              <div className="text-xl font-semibold">Name: {pet.name}</div>
            </div>
          </Link>
        ))
      ) : (
        <p className="text-xl font-semibold mb-4 text-center">No pets found.</p>
      )}
      <div className="flex justify-center">
        <Link to="/add-pet" className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-700">Add Pet</Link>
      </div>
    </div>
  

    </main>
  );
}