///// Api url
const apiUrl = `${process.env.REACT_APP_API_URI}api/`

//// Controller urls
const authController = `${apiUrl}Auth`
const userController = `${apiUrl}User`
const articleController = `${apiUrl}Article`

//// ActionUrls
// Auth
const register = `${authController}/Register`
const login = `${authController}/login`
const logout = `${authController}/logout`
const confirmEmail = `${authController}/confirmEmail`
const checkAuth = `${authController}/check-authentication`
const requestPasswordChange = `${authController}/request-password-change`
const resetPassword = `${authController}/reset-password`

// User
const getUsers = `${userController}`
const deleteUser = `${userController}/Delete/`
const changeRole = `${userController}/ChangeRole/`

// Article
const postArticleUrl = `${articleController}/add-article`
const getArticleById = `${articleController}/get-article/`
const deleteArticle = `${articleController}/delete-article/`
const updateArticleUrl = `${articleController}/update-article/`
const publishArticle = `${articleController}/publish-article/`

//Sidebar
const getSidebarContentUrl = `${articleController}/sidebar-content`

export {
    register,
    login,
    logout,
    confirmEmail,
    checkAuth,
    requestPasswordChange,
    resetPassword,
    getUsers,
    deleteUser,
    changeRole,
    postArticleUrl,
    getSidebarContentUrl,
    getArticleById,
    deleteArticle,
    updateArticleUrl,
    publishArticle,
}
