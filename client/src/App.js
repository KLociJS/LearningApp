import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements
} from "react-router-dom";

import AuthContext from "Context";
import { Suspense, lazy, useEffect, useState } from "react";

//Stylesheets
import "./GlobalStyle/Component.css";
import "./GlobalStyle/Index.css";
import "./GlobalStyle/Layout.css";
import "./GlobalStyle/Typography.css";

//Layout
import { Layout } from "Pages";

//Pages
import {
  ConfirmEmail,
  Home,
  Login,
  RequestPasswordChange,
  RequestPasswordReset,
  SharedArticle,
  SingUp,
  UnAuthorized
} from "Pages";

import { RequireRoles, UnauthenticatedRoute } from "Components";

import checkAuthentication from "Api/checkAuthentication";
import ArticleContextWrapper from "Components/ArticleContextWrapper/ArticleContextWrapper";
import MarkdownEditorSkeleton from "Components/MarkdownEditor/MarkdownEditorSkeleton/MarkdownEditorSkeleton";
import Article from "Pages/Articles/Components/Article/Article";
import ArticleLanding from "Pages/Articles/Components/ArticleLanding/ArticleLanding";
import ArticleCardSkeleton from "Pages/Home/Components/Featured/Components/Components/ArticleCardSkeleton";

const Users = lazy(() => import(/* webpackChunkName: "users" */ "./Pages/Users/Users"));
const Articles = lazy(() => import(/* webpackChunkName: "articles" */ "./Pages/Articles/Articles"));
const CreateArticle = lazy(() =>
  import(/* webpackChunkName: "createArticle" */ "./Pages/CreateArticle/CreateArticle")
);
const UpdateArticle = lazy(() =>
  import(/* webpackChunkName: "updateArticle" */ "./Pages/UpdateArticle/UpdateArticle")
);

const renderLoader = () => <p>Loading</p>;

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="shared-article/:id" element={<SharedArticle />} />
      <Route index element={<Home />} />
      <Route element={<RequireRoles allowedRoles={["User"]} />}>
        <Route path="confirm-email" element={<ConfirmEmail />} />
        <Route element={<ArticleContextWrapper />}>
          <Route
            path="article"
            element={
              <Suspense fallback={<ArticleCardSkeleton />}>
                <Articles />
              </Suspense>
            }>
            <Route index element={<ArticleLanding />} />
            <Route path=":id" element={<Article />} />
          </Route>
          <Route
            path="update-article/:id"
            element={
              <Suspense fallback={<MarkdownEditorSkeleton />}>
                <UpdateArticle />
              </Suspense>
            }
          />
        </Route>
        <Route
          path="create-article"
          element={
            <Suspense fallback={<MarkdownEditorSkeleton />}>
              <CreateArticle />
            </Suspense>
          }
        />
      </Route>
      <Route element={<RequireRoles allowedRoles={["Admin"]} />}>
        <Route
          path="users"
          element={
            <Suspense fallback={renderLoader()}>
              <Users />
            </Suspense>
          }
        />
      </Route>
      <Route element={<UnauthenticatedRoute />}>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SingUp />} />
        <Route path="reset-password" element={<RequestPasswordReset />} />
        <Route path="forgot-password" element={<RequestPasswordChange />} />
      </Route>
      <Route path="/unauthorized" element={<UnAuthorized />} />
    </Route>
  )
);

export default function App() {
  const [user, setUser] = useState(null);
  const [isAuthenticationDone, setIsAuthenticationDone] = useState(false);

  useEffect(() => {
    if (user === null) {
      checkAuthentication(setUser, setIsAuthenticationDone);
    }
  }, [setUser, user]);

  return (
    <AuthContext.Provider value={{ user, setUser, isAuthenticationDone }}>
      <RouterProvider router={router} />
    </AuthContext.Provider>
  );
}
