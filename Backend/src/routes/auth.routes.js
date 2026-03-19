const { Router } = require('express');
const authController = require('../controllers/auth.controller');
const authMiddleware = require("../middlewares/auth.middleware")

const authRouter =Router();



/**
 * @route POST /api/auth/register
 * @desc Register a new user
 * @access Public
 */
authRouter.post('/register', authController.registerUser);


/**
 * @route POST /api/auth/login
 * @desc Login a user and return a token
 * @access Public
 */
authRouter.post('/login', authController.loginUser);


/**
 * @route POST /api/auth/logout
 * @desc Logout a user and blacklist the token
 * @access Private
 */
authRouter.get('/logout', authController.logoutUser);
 

/**
 * @route GET /api/auth/get-me
 * @desc get the current logged user details 
 * @access Private
 */

authRouter.get('/get-me',authMiddleware.authUser,authController.getMydetails)

module.exports = authRouter;