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
          setUser(userData);
  
          const posts = await getAllPosts();
          setUserPosts(posts.filter((post) => post.is_owner === true));
  
          const pets = await getUserPets();
          console.log("Fetched Pets:", pets);
          setUserPets(pets);
  
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
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
          <h2 className="text-3xl font-semibold text-black">{user.map && `${user.first_name} ${user.last_name}`}</h2>
          <p className="text-blue-800 mb-2">{user && user.email}</p>
          <Link to="/edit-user" className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-700">Edit Profile</Link>
        </div>
      </div>
    </div>
  
    <div className="container mx-auto mt-8 max-w-md">
      <h1 className="text-3xl text-blue-800 font-semibold mb-4 text-center">My Posts</h1>
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
      {loading ? (
        <p className="text-xl font-semibold mb-4 text-center">Loading...</p>
      ) : userPets.length ? (
        userPets.map((pet) => (
          <Link key={pet.id} to={`/petLists/${pet.id}`}>
            <div className="bg-gray-100 rounded-md p-4 mb-4">
              <div className="text-xl font-semibold">Number: {pet.id}</div>
              <div className="text-xl font-semibold">Description: {pet.name}</div>
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
  
  
{/* 
<div className="fixed bottom-0 left-0 w-full flex justify-between items-center px-4" style={{ marginBottom: "-30px" }}>
  <img src={emma} alt="Emma" className="w-36 h-36 ml-4 mr-2" />
  <img src={purrscilla} alt="Purrscilla" className="w-36 h-36 mr-4 ml-2" />
</div> */}

    </main>
  );
}