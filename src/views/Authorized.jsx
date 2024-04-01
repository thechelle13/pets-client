// import { Navigate, Outlet } from "react-router-dom"
// import { NavBar } from "../components/Navbar"


// export const Authorized = ({setToken, token}) => {
//   if (localStorage.getItem("pet_token")) {
//     return <>
//    {/* <NavBar token={token} setToken={setToken} /> */}
//       <main className="p-4">
//         <Outlet />
//       </main>
//     </>
//   }
//   return <Navigate to='/login' replace />
// }

import { Navigate, Outlet } from "react-router-dom"

export const Authorized = ({ token }) => {
  if (token) {
    return <Outlet />
  }
  return <Navigate to='/login' replace />
}