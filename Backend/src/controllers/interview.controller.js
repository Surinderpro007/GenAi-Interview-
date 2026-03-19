const pdfParse = require("pdf-parse")
const genrateInterviewReport = require("../services/ai.service")
const interviewReportModel = require("../models/interviewReport.model")


async function genrateInterviewReportController(req, res) {
    const { selfDescription, jobDescription } = req.body

    // ✅ Only parse PDF if a file was actually uploaded
    let resumeText = ""
    if (req.file) {
        const resumeContent = await pdfParse(req.file.buffer)
        resumeText = resumeContent.text
    }

    const interviewReportbyAi = await genrateInterviewReport({
        resume: resumeText,
        selfDescription,
        jobDescription
    })

    const interviewReport = await interviewReportModel.create({
        user: req.user._id,
        resume: resumeText,
        selfDescription,
        jobDescription,
        ...interviewReportbyAi
    })

    res.status(201).json({
        message: "Interview Report Generated Successfully.",
        interviewReport  // ✅ fixed typo — matches frontend expectation
    })
}


/**
 * @description get interview report 
 */

async function getInterviewReportController(req, res) {
    
   const {interviewId} = req.params
const interviewReport = await interviewReportModel.findOne({_id: interviewId, user:req.user._id})
    if(!interviewReport){
        return res.status(404).json({
            message: "Interview Report Not Found"
        })
    }

    res.status(200).json({
        message: "Interview Report Found",
        interviewReport
    })


}

/**
 * @description controller to get all the reports of logged user
 */

async function getAllInterviewReportsController(req, res) {
    const interviewReports = await interviewReportModel.find({user:req.user._id}).sort({createdAt:-1}).select("-resume -selfDescription -jobDescription -__v -technicalQuestions -behavioralQuestions -skillGaps -preparationPlan")
    res.status(200).json({
        message: "Interview Reports Fetched Successfully",
        interviewReports
    })
}

module.exports={
genrateInterviewReportController,
getInterviewReportController,
getAllInterviewReportsController
}