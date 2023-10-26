///// Api url
const apiUrl = `${process.env.REACT_APP_API_URI}api/`;

//// Controller urls
const authController = `${apiUrl}Auth`;
const userController = `${apiUrl}User`;
const articleController = `${apiUrl}Article`;
const profileController = `${apiUrl}Profile`;

//// ActionUrls
// Auth
const register = `${authController}/Register`;
const login = `${authController}/login`;
const logout = `${authController}/logout`;
const confirmEmail = `${authController}/confirmEmail`;
const checkAuth = `${authController}/check-authentication`;
const requestPasswordChange = `${authController}/request-password-change`;
const resetPassword = `${authController}/reset-password`;

// User
const getUsers = `${userController}`;
const deleteUser = `${userController}/Delete/`;
const changeRole = `${userController}/ChangeRole/`;

// Article
const postArticleUrl = `${articleController}/add-article`;
const getArticleById = `${articleController}/get-article/`;
const deleteArticle = `${articleController}/delete-article/`;
const updateArticleUrl = `${articleController}/update-article/`;
const publishArticle = `${articleController}/publish-article/`;
const featuredArticle = `${articleController}/featured-articles`;
const searchArticle = `${articleController}/search-article`;
const getSharedArticle = `${articleController}/shared-article/`;
const updateCategory = `${articleController}/update-category/`;
const updatePublishedArticle = `${articleController}/update-published-article/`;
const unpublishArticle = `${articleController}/unpublish-article/`;

//Sidebar
const getSidebarContentUrl = `${articleController}/sidebar-content`;
const getSharedSidebarContent = `${articleController}/get-shared-article-sidebar-content/`;

//Profile
const postProfilePicture = `${profileController}/upload-profile-picture`;
const getProfilePicture = `${process.env.REACT_APP_API_URI}profile-picture/`;
const getProfileData = `${profileController}/get-profile-data/`;
const patchBio = `${profileController}/update-bio`;

export {
  changeRole,
  checkAuth,
  confirmEmail,
  deleteArticle,
  deleteUser,
  featuredArticle,
  getArticleById,
  getProfileData,
  getProfilePicture,
  getSharedArticle,
  getSharedSidebarContent,
  getSidebarContentUrl,
  getUsers,
  login,
  logout,
  patchBio,
  postArticleUrl,
  postProfilePicture,
  profileController,
  publishArticle,
  register,
  requestPasswordChange,
  resetPassword,
  searchArticle,
  unpublishArticle,
  updateArticleUrl,
  updateCategory,
  updatePublishedArticle
};
