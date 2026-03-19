const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const tokenBlackList = require('../models/blacklist.model');


/**
 * @route POST /api/auth/register
 * @name registerUser
 * @desc Register a new user
 * @access Public
 */
async function registerUser(req, res) {
    const { username, email, password } = req.body;
    try{
        if(!username || !email || !password){
            return res.status(400).json({
                 message: 'Please provide usrename, email and password'
                 });
        }

        const isUserExist = await userModel.findOne({ 
            $or: [{ email }, { username }]
         });
        if(isUserExist){
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user =  await  userModel.create({
             username, 
             email, 
             password: hashedPassword
             });

        const token = jwt.sign({
             id: user._id 
            }, 
            process.env.JWT_SECRET, {
                 expiresIn: '1d' 
            });

        res.cookie('token', token)
        res.status(201).json({
            message: 'User registered successfully',
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            },
             token
        })
          

    }
    catch(error){
        res.status(500).json({ message: 'Server error' });
    }
}

/**
 * @route POST /api/auth/login
 * @name loginUser
 * @desc Login a user
 * @access Public
 */

async function loginUser(req, res) {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if(!user){
        return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid){
        return res.status(400).json({ message: 'Invalid credentials' });
    }

     const token =  jwt.sign({
             id: user._id 
            }, 
            process.env.JWT_SECRET, {
                 expiresIn: '1d' 
            });

        res.cookie('token', token)
        res.status(200).json({
            message: 'User logged in successfully',
            user:{
                 id: user._id,
                 username: user.username,
                 email: user.email,
                 token: token
            }
        })

}

/**
 * 
 * @route GET /api/auth/logout 
 * @name logoutUser
 * @desc Logout a user
 * @access Public
 */

async function logoutUser(req, res) {
    const token = req.cookies.token;
    if(!token){
        return res.status(400).json({ message: 'No token provided' });
    }

    await tokenBlackList.create({ token });
    res.clearCookie('token');
    res.status(200).json({ message: 'User logged out successfully' });

}


/**
 * @route GET /api/auth/get-me
 * @name getMydetails
 * @desc get current logged in user details
 * @access private
 */

async function getMydetails(req,res) {
    const user = await userModel.findById(req.user.id)

    res.status(201).json({
        message:"User details fetched successfully",
        user:{
            id: user._id,
            username: user.username,
            email: user.email
        }
    })
}


module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    getMydetails

};