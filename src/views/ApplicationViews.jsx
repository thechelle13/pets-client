import { Route, Routes } from "react-router-dom"
import { Register } from "../components/auth/Register";
import { Authorized } from "./Authorized";
import { Home } from "../pages/Home";
import { Login } from "../components/auth/Login";
import { PostList } from "../pages/PostList";
import { PostDetail } from "../pages/PostDetails";
import { UserEditForm } from "../components/forms/UserEditForm";
import { PostForm } from "../components/forms/PostForm";
import { PetForm } from "../components/forms/PetForm";
import { PetDetails } from "../pages/PetDetails";



export const ApplicationViews = ({ token, setToken }) => {
  // console.log("Token in ApplicationViews:", token); 
  return (
    <> 
      <Routes>
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/register" element={<Register setToken={setToken} />} />
        <Route element={<Authorized token={token} />}>
          {/* Add Routes here */}
          <Route path="/" element={<Home token={token} setToken={setToken} />} />
          <Route
            path="/edit-user"
            element={<UserEditForm token={token} setToken={setToken} />} 
          />
        
          <Route
            path="/postLists"
            element={<PostList token={token} setToken={setToken} />}   />
          <Route
  path="/postLists/:postId"
  element={<PostDetail token={token} setToken={setToken} />}
/>

<Route path="/add-post" element={<PostForm />} />
          <Route path="/add-pet" element={<PetForm />} />

          <Route
    path="/pets/:petId"
    element={<PetDetails token={token} setToken={setToken} />}
/>

        </Route>
      </Routes>
    </>
  );
};