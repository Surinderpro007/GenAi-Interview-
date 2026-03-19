const express = require("express")
const authMiddleware = require('../middlewares/auth.middleware')
const interviewController = require("../controllers/interview.controller")
const upload = require("../middlewares/file.middleware")

const interviewRouter = express.Router()

/**
 * @route POST  /api/interview
 * @desc  Genrate new interview report on basisi of user self description resume PDF and job description
 * @access private
 */

interviewRouter.post("/",authMiddleware.authUser,upload.single("resume"), interviewController.genrateInterviewReportController)

/**
 * @route GET /api/interview/report/:interviewId
 * @desc get report by interviewId
 * @access private
 */

interviewRouter.get("/report/:interviewId",authMiddleware.authUser,interviewController.getInterviewReportController)

/**
 * @route GET /api/interview
 * @desc get all interview reports of logged user
 * @access private
 */

interviewRouter.get("/",authMiddleware.authUser, interviewController.getAllInterviewReportsController)
 

module.exports = interviewRouter        