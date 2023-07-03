import * as React from "react";
import { createRoot } from "react-dom/client";
import {
    createBrowserRouter,
    RouterProvider,
    Route,
    Link,
    createRoutesFromElements,
} from "react-router-dom";

import './index.css'

import Layout from "./Pages/_Layout/Layout";

import Home from "./Pages/Home/Home"
import Login from "./Pages/Login/Login"
import Singup from "./Pages/SingUp/SignUp"

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Singup />} />
        </Route>
    )
);

createRoot(document.getElementById("root")).render(
    <RouterProvider router={router} />
);