const mongoose = require("mongoose");

/**
 * - Job description schema :String
 * - Resume text : String
 * - Self-description: String
 * - matchScore : Number
 * 
 *  Technical Queshions :
 *          [{
 *          queshion: "",
 *          intention: "",
 *          answer: ""
 *              }]
 * - Behiviour Queshions :
 *          [{
 *          queshion: "",
 *          intention: "",
 *          answer: ""
 *              }]
 * - Skill Gap :[
 *          {
 *              skill:'',
 *                serverity:{
 *                  type: String
 *                  enum:['low', 'medium', 'high']
 *                  }
 *              }
 *          ]
 * - Prepration plan :[
 *          {
 *          day: Number, 
 *          focus: String,         
 *          tasks: [String]         
 * }         
 * ]
 */

const technicalQuestionSchema = new mongoose.Schema({
    question: {
        type: String,
        require: [true, "Technical question is required"]
    },
    intention: {
        type: String,
        require: [true, "Intention is required"]
    }, 
    answer: {
        type: String,
        require: [true, "Answer is required"]
    }, 

},{
    _id: false
})

const behavioralQuestionSchema = new mongoose.Schema({
    question: {
        type: String,
        require: [true, "Technical question is required"]
    },
    intention: {
        type: String,
        require: [true, "intention is required"]
    }, 
    answer: {
        type: String,
        require: [true, "Answer is required"]
    }, 

},{
    _id: false
})

const skillGapSchema = new mongoose.Schema({
    skill: {
        type: String,
        require: [true, "Technical queshion is required"]
    },
    severity: {
        type: String,
        enum:['low', 'medium', 'high'],
        require: [true, "Severity is required"]
    }, 
},{
    _id: false
})


const preparationPlanSchema = new mongoose.Schema({
    day: {
        type: Number,
        require: [true, "Day is required"]
    },
    focus: {
        type: String,
        require: [true, "Focus is required"]
    }, 
    tasks: [{
        type: String,
        require: [true, "Task is required"]
    }, ]
},{
    _id: false
})

const interviewReportSchema = new mongoose.Schema({
    jobDescription: {
        type: String,
        require: [true, 'Job Description is Required']
    },
    resume: {
        type: String
    },
    selfDescription: {
        type: String
    },
    matchScore: {
        type: Number,
        min: 0,
        max: 100,
    },
    technicalQuestions: [technicalQuestionSchema], 
    behavioralQuestions : [behavioralQuestionSchema],
    skillGaps : [skillGapSchema],
    preparationPlan : [preparationPlanSchema],
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    title: {
        type: String,
        require: [true, "Title is required"]
    }

},{
    timestamps: true
})


const interviewReportModel = mongoose.model("interviewReport", interviewReportSchema)

module.exports = interviewReportModel
