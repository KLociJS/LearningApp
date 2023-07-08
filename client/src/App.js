import {
    createBrowserRouter,
    RouterProvider,
    Route,
    createRoutesFromElements,
} from "react-router-dom";

import AuthContext from "./Context/AuthProvider";
import { useState } from "react";

//Stylesheets
import './GlobalStyle/Index.css'
import './GlobalStyle/Layout.css'
import './GlobalStyle/Component.css'
import './GlobalStyle/Typography.css'

//Layout
import Layout from "./Pages/_Layout";

//Pages
import Home from "./Pages/Home"
import Login from "./Pages/Login"
import Singup from "./Pages/SingUp"
import ResetPassword from "./Pages/ResetPassword/ResetPassword";
import Users from "./Pages/Users/Users";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Singup />} />
            <Route path="reset-password" element={<ResetPassword />} />
            <Route path="users" element={ <Users/> }/>
        </Route>
    )
);

export default function App() {
  const [user,setUser] = useState({})
  
  return (
    <AuthContext.Provider value={{user,setUser}}>
        <RouterProvider router={router} />
    </AuthContext.Provider>
  )
}
