import {
    createBrowserRouter,
    RouterProvider,
    Route,
    createRoutesFromElements,
} from "react-router-dom";

import AuthContext from "Context";
import { useState, useEffect } from "react";

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
    RequesPasswordReset,
    Users,
    Articles,
    ConfirmEmail,
    CreateArticle,
    RequestPasswordChange,
    UpdateArticle
} from "Pages"

import { RequireRoles, UnauthenticatedRoute } from "Components";

import { checkAuthentication } from "Api";

import ArticleLanding from "Pages/Articles/Components/ArticleLanding/ArticleLanding";
import Article from "Pages/Articles/Components/Article/Article";


const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Layout />}>
            <Route element={<RequireRoles allowedRoles={['User']} />}>
                <Route path="confirm-email" element={<ConfirmEmail />} />   
                <Route index element={<Home />} />
                <Route path="article" element={<Articles />}>
                    <Route index element={<ArticleLanding />} />
                    <Route path=":id" element={<Article />} />
                </Route>
                <Route path="create-article" element={<CreateArticle />} />
                <Route path="update-article/:id" element={<UpdateArticle />} />
            </Route>
            <Route element={<RequireRoles allowedRoles={['Admin']} />}>
                <Route path="users" element={<Users />} />
            </Route>
            <Route element={<UnauthenticatedRoute />}>
                <Route path="login" element={<Login />} />
                <Route path="signup" element={<SingUp />} />
                <Route path="reset-password" element={<RequesPasswordReset />} />
                <Route path="forgot-password" element={<RequestPasswordChange />} />
            </Route>
            <Route path='/unauthorized' element={<UnAuthorized />} />
        </Route>
    )
);

export default function App() {
    const [user, setUser] = useState(null)
    const [isAuthenticationDone, setIsAuthenticationDone] = useState(false)
  
  useEffect(()=>{
    if(user===null){
      checkAuthentication(setUser,setIsAuthenticationDone)
    }
  },[setUser, user])

    return (
        <AuthContext.Provider value={{ user, setUser, isAuthenticationDone }}>
            <RouterProvider router={router} />
        </AuthContext.Provider>
    )
}
