///// Api url
const apiUrl = 'http://localhost:5000/api/'

//// Controller urls
const authController = `${apiUrl}Auth/`
const userController = `${apiUrl}User/`

//// ActionUrls
// Auth
const register = `${authController}Register`
const login = `${authController}login`
const logout = `${authController}logout`
const confirmEmail = `${authController}confirmEmail`
const checkAuth = `${authController}check-authentication`
const requestPasswordChange = `${authController}request-password-change`
const resetPassword = `${authController}reset-password`

// User
const getUsers = `${userController}`
const deleteUser = `${userController}Delete/`
const changeRole = `${userController}ChangeRole/`

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
}
