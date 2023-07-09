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
import { 
    UnAuthorized, 
    Home, 
    Login, 
    SingUp, 
    ResetPassword, 
    Users,
} from "Pages"

import { RequireRoles, UnauthenticatedRoute } from "Components";


const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Layout />}>
            <Route element={<RequireRoles allowedRoles={['User']} />}>
                <Route index element={<Home />} />  
            </Route>
            <Route element={<RequireRoles allowedRoles={['Admin','Moderator']} />}>
                <Route path="users" element={ <Users/> }/>
            </Route>
            <Route element={<UnauthenticatedRoute />}>
                <Route path="login" element={<Login />} />
                <Route path="signup" element={<SingUp />} />
                <Route path="reset-password" element={<ResetPassword />} />
            </Route>
            <Route path='/unauthorized' element={<UnAuthorized/>}/>
        </Route>
    )
);

export default function App() {
  const [user,setUser] = useState(null)
  
  return (
    <AuthContext.Provider value={{user,setUser}}>
        <RouterProvider router={router} />
    </AuthContext.Provider>
  )
}
