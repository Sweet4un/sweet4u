const express = require('express');
const { registerUser, loginUser, logoutUser, forgotPassword, resetPAssword, getUserDetails, updatePassword, updateProfile, getAllUsers, getSingleUser, updateUserRole, deleteUser} = require('../controllers/userController');
const {isAuthenticatedUser, authorizedRoles} = require("../middleware/auth")


const router = express.Router();

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPAssword);
router.route("/logout").get(logoutUser)
router.route("/me").get(isAuthenticatedUser,getUserDetails)
router.route("/password/update").put(isAuthenticatedUser, updatePassword);
router.route("/me/update").put(isAuthenticatedUser, updateProfile);
router.route("/admin/users").get(isAuthenticatedUser, authorizedRoles("admin"), getAllUsers);
router.route("/admin/user/:id").get(isAuthenticatedUser, authorizedRoles("admin"),getSingleUser).put(isAuthenticatedUser, authorizedRoles("admin"),updateUserRole).delete(isAuthenticatedUser, authorizedRoles("admin"),deleteUser);

module.exports = router;