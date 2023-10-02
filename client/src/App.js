import {
    createBrowserRouter,
    RouterProvider,
    Route,
    createRoutesFromElements,
} from "react-router-dom";

import AuthContext from "Context";
import { useState, useEffect, lazy, Suspense } from "react";

//Stylesheets
import './GlobalStyle/Index.css'
import './GlobalStyle/Layout.css'
import './GlobalStyle/Component.css'
import './GlobalStyle/Typography.css'

//Layout
import { Layout, SharedArticle } from "Pages"

//Pages
import {
    UnAuthorized,
    Home,
    Login,
    SingUp,
    RequesPasswordReset,
    ConfirmEmail,
    RequestPasswordChange,
} from "Pages"


import { RequireRoles, UnauthenticatedRoute } from "Components";

import { checkAuthentication } from "Api";

import ArticleLanding from "Pages/Articles/Components/ArticleLanding/ArticleLanding";
import Article from "Pages/Articles/Components/Article/Article";
import UsersSkeleton from "Pages/Users/Components/Skeleton/UsersSkeleton";

const Users = lazy(()=>import("./Pages/Users/Users"))
const Articles = lazy(()=>import("./Pages/Articles/Articles"))
const CreateArticle = lazy(()=>import("./Pages/CreateArticle/CreateArticle"))
const UpdateArticle = lazy(()=>import("./Pages/UpdateArticle/UpdateArticle"))

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Layout />}>
            <Route path="shared-article/:id" element={<SharedArticle />} />
            <Route index element={<Home />} />
            <Route element={<RequireRoles allowedRoles={['User']} />}>
                <Route path="confirm-email" element={<ConfirmEmail />} />   
                <Route 
                    path="article"
                    element={
                        <Suspense>
                            <Articles fallback={<></>} />
                        </Suspense>}
                >
                    <Route index element={<ArticleLanding />} />
                    <Route path=":id" element={<Article />} />
                </Route>
                <Route
                    path="create-article"
                    element={
                        <Suspense fallback={<></>}>
                            <CreateArticle />
                        </Suspense>}
                />
                <Route
                    path="update-article/:id"
                    element={
                        <Suspense>
                            <UpdateArticle />
                        </Suspense>}
                />
            </Route>
            <Route element={<RequireRoles allowedRoles={['Admin']} />}>
                <Route 
                    path="users" 
                    element={
                        <Suspense fallback={<UsersSkeleton/>}>
                            <Users />
                        </Suspense>}
                />
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
