import * as React from "react";
import { createRoot } from "react-dom/client";

import {
    createBrowserRouter,
    RouterProvider,
    Route,
    createRoutesFromElements,
} from "react-router-dom";

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

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Singup />} />
            <Route path="reset-password" element={<ResetPassword />} />
        </Route>
    )
);

createRoot(document.getElementById("root")).render(
    <RouterProvider router={router} />
);