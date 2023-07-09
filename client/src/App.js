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
import { Layout } from "Pages"

//Pages
import { Home } from "Pages"
import { Login } from "Pages"
import { SingUp } from "Pages"
import { ResetPassword } from "Pages"
import { Users } from "Pages"


const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<SingUp />} />
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
