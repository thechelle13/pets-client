import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUserById } from "../services/userServices";
import { getAllPosts } from "../services/postServices";


export const Home = ({ token, setToken}) => {

  const [currentUser, setCurrentUser] = useState({ user: {} })
  const [posts, setPosts] = useState([])
  const navigate = useNavigate();

  // const getAndSetCurrentUser = () => {
  //   getUserById().then((currentUser) => {
  //     setCurrentUser(currentUser);
  //   });
  // };

  const getAndSetCurrentUser = () => {
    const userId = localStorage.getItem("user_id"); 
    if (userId) {
      getUserById(userId).then((currentUser) => {
        setCurrentUser(currentUser);
      });
    }
  };

  const getAndSetMyPosts = async () => {
    try {
      const postsArray = await getAllPosts();
      const filteredArray = postsArray.filter((post) => post.is_owner === true);
      // const sortedArray = filteredArray.sort(
      //   (a, b) => new Date(b.publication_date) - new Date(a.publication_date)
      // );
      setPosts(filteredArray);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
        
    // Fetch and set tech user
    getAndSetCurrentUser();
    getAndSetMyPosts();
  }, []); 


  return (
    <main>
      <div className="text-center my-8 p-6 rounded-lg shadow-lg max-w-md mx-auto">
        <h1 className="text-5xl font-semibold mb-4 text-blue-800">
          Welcome to Community Pets
        </h1>

        <div className="user-info-container bg-gray-500 p-6 rounded-md shadow-md">
        <p className="text-black-700 mb-4">
          A platform designed to connect pet owners community to exchange pet sitting services.
        </p>
          {/* <h2 className="text-xl font-semibold mb-2 text-blue-800">
            {petUser.user.first_name} {petUser.user.last_name}
          </h2> */}
          {/* <p className="text-blue-800 mb-2">{petUser.user.email}</p> */}
          {/* <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            onClick={() => navigate(`/edit-user/${petUser.user.id}`)}
          >
            Edit Profile
          </button> */}
        </div>
  

        <div className="container mx-auto mt-8">
          <h1 className="text-3xl text-blue-800 font-semibold mb-4 text-center">
            My Posts
          </h1>

          {/* <div>
            {myPosts && myPosts.length ? (
              myPosts.map((post) => (
                <Link key={post.id} to={`/postLists/${post.id}`}> 
                  <div className="bg-gray-100 rounded-md p-4 mb-4">
                   
                      <div className="text-xl font-semibold">
                        Title: {post.title}
                      </div>
                     
                      <div className="text-gray-500">
                        Publication Date: {post.publication_date}
                      </div>
                
                      <div>
                        <div className="text-sm text-gray-500">
                          Author: {post.tech_user.user.username}
                        </div>
                        <div className="text-sm text-gray-500">
                          Skill Count: {post.skills.length}
                        </div>
                        <div className="text-sm text-gray-500">
                          Area: {post.area.label}
                        </div>
                     
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <p className="text-xl font-semibold mb-4 text-center">
                No posts found.
              </p>
            )}
          </div> */}
        </div>
        <h1 className="text-3xl text-blue-800 font-semibold mb-4 text-center">
            My Pets
          </h1>
      </div>
    </main>
  );
};