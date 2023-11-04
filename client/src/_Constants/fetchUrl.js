///// Api url
const apiUrl = `${process.env.REACT_APP_API_URI}api/`;

//// Controller urls
const authController = `${apiUrl}Auth`;
const userController = `${apiUrl}User`;
const articleController = `${apiUrl}Article`;
const profileController = `${apiUrl}Profile`;
const reportController = `${apiUrl}Report`;

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
const getFeaturedArticlesByAuthor = `${articleController}/get-articles-by-author/`;
const fullTextSearch = `${articleController}/article-full-text-search?searchTerm=`;
const unPublishByMod = `${articleController}/un-publish-by-mod/`;

//Sidebar
const getSidebarContentUrl = `${articleController}/sidebar-content`;
const getSharedSidebarContent = `${articleController}/get-shared-article-sidebar-content/`;

//Profile
const postProfilePicture = `${profileController}/upload-profile-picture`;
const getProfilePicture = `${process.env.REACT_APP_API_URI}profile-picture/`;
const getProfileData = `${profileController}/get-profile-data/`;
const patchBio = `${profileController}/update-bio`;

//Report
const postArticleReport = `${reportController}/post-report-article`;
const getPendingReports = `${reportController}/pending`;
const patchArticleReport = `${reportController}/patch-article-report/`;
const getPendingArticleReportCount = `${reportController}/pending-report-count`;

export {
  changeRole,
  checkAuth,
  confirmEmail,
  deleteArticle,
  deleteUser,
  featuredArticle,
  fullTextSearch,
  getArticleById,
  getFeaturedArticlesByAuthor,
  getPendingArticleReportCount,
  getPendingReports,
  getProfileData,
  getProfilePicture,
  getSharedArticle,
  getSharedSidebarContent,
  getSidebarContentUrl,
  getUsers,
  login,
  logout,
  patchArticleReport,
  patchBio,
  postArticleReport,
  postArticleUrl,
  postProfilePicture,
  profileController,
  publishArticle,
  register,
  requestPasswordChange,
  resetPassword,
  searchArticle,
  unPublishByMod,
  unpublishArticle,
  updateArticleUrl,
  updateCategory,
  updatePublishedArticle
};
