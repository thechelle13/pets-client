import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getUser, updateUser } from "../services/userServices";
import { getAllPosts } from "../services/postServices";
import { getUserPets } from "../services/petServices";

export const Home = ({ token }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [userPets, setUserPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUserInfo, setEditedUserInfo] = useState({
    email: "",
    firstName: "",
    lastName: "",
    pet_user: {
      bio: "",
      city: "",
    },
  });
  const [savingChanges, setSavingChanges] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await getUser(token);
        setCurrentUser(user);

        const posts = await getAllPosts();
        setUserPosts(posts.filter((post) => post.is_owner === true));

        const pets = await getUserPets(user.id);
        setUserPets(pets);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, [token]);

  const handleEdit = () => {
    setIsEditing(true);
    setEditedUserInfo({
      email: currentUser.email,
      firstName: currentUser.first_name,
      lastName: currentUser.last_name,
      pet_user: {
        bio: currentUser.pet_user.bio,
        city: currentUser.pet_user.city,
      },
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUserInfo({ ...editedUserInfo, [name]: value });
  };

  const saveChanges = async () => {
    try {
      setSavingChanges(true);
      await updateUser(currentUser.id, editedUserInfo);
      setCurrentUser((prevUser) => ({ ...prevUser, ...editedUserInfo }));
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating user info:", error);
    } finally {
      setSavingChanges(false);
    }
  };

  return (
    <main className="bg-gradient-to-b from-blue-500 to-purple-500 h-full">
      <div className="bg-gradient-to-b from-blue-200 to-blue-800 text-center my-8 p-6 rounded-lg shadow-lg max-w-md mx-auto">
        <h1 className="text-5xl font-semibold mb-4 text-white">
          Welcome to Community Pets
        </h1>

        <div className="user-info-container bg-gray-500 p-6 rounded-md shadow-md">
          <p className="text-black-700 mb-4">
            A platform designed to connect pet owners community to exchange pet sitting services.
          </p>
          {currentUser && (
            <>
              <div className="mb-2">
                <h2 className="text-xl font-semibold text-black">
                  {isEditing ? (
                    <>
                      <input
                        type="text"
                        name="firstName"
                        value={editedUserInfo.firstName}
                        onChange={handleInputChange}
                        className="mb-2 mr-2"
                      />
                      <input
                        type="text"
                        name="lastName"
                        value={editedUserInfo.lastName}
                        onChange={handleInputChange}
                        className="mb-2"
                      />
                    </>
                  ) : (
                    <>
                      {currentUser.first_name} {currentUser.last_name}
                    </>
                  )}
                </h2>
              </div>
              {isEditing ? (
                <input
                  type="text"
                  name="email"
                  value={editedUserInfo.email}
                  onChange={handleInputChange}
                  className="mb-2"
                />
              ) : (
                <p className="text-blue-800 mb-2">{currentUser.email}</p>
              )}
              {isEditing ? (
                <textarea
                  name="bio"
                  value={editedUserInfo.bio}
                  onChange={handleInputChange}
                  className="mb-2"
                />
              ) : (
                <p className="text-blue-800 mb-2">{currentUser.pet_user.bio}</p>
              )}
              {isEditing ? (
                <input
                  type="text"
                  name="city"
                  value={editedUserInfo.city}
                  onChange={handleInputChange}
                  className="mb-2"
                />
              ) : (
                <p className="text-blue-800 mb-2">{currentUser.pet_user.city}</p>
              )}
              {isEditing ? (
                <button
                  onClick={saveChanges}
                  disabled={savingChanges}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                  {savingChanges ? "Saving..." : "Save"}
                </button>
              ) : (
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                  onClick={handleEdit}
                >
                  Edit Profile
                </button>
              )}
            </>
          )}
        </div>

        <div className="container mx-auto mt-8">
          <h1 className="text-3xl text-blue-800 font-semibold mb-4 text-center">
            My Posts
          </h1>

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
            <p className="text-xl font-semibold mb-4 text-center">
              No posts found.
            </p>
          )}
        </div>

        <div className="container mx-auto mt-8">
          <h1 className="text-3xl text-blue-800 font-semibold mb-4 text-center">
            My Pets
          </h1>
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
            <p className="text-xl font-semibold mb-4 text-center">
              No pets found.
            </p>
          )}
        </div>
      </div>
    </main>
  );
};
