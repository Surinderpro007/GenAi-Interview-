const { z } = require("zod");
const { zodToJsonSchema } = require("zod-to-json-schema");

const interviewReportSchema = z.object({
    matchScore: z.number().describe("A score between 0 and 100 indicating how well the candidate's profile matches the job desscription"),
    technicalQuestions: z.array(z.object({
        question: z.string().describe('Technical question can be asked in the interview'),
        intention: z.string().describe('The intention of the interview behind asked this question'),
        answer: z.string().describe('How to answer this question, what point to cover, what approach to take etc. '),
    })).describe("Technical question that can be asked in the interview along with their intention and how to answer them  "),
    behavioralQuestions: z.array(z.object({
        question: z.string().describe('Technical question can be asked in the interview'),
        intention: z.string().describe('The intention of the interview behind asked this question'),
        answer: z.string().describe('How to answer this question, what point to cover, what approach to take etc. '),
    })).describe("Behavioral question that can be asked in the interview along with their intention and how to answer them  "),
    skillGaps: z.array(z.object({
        skill: z.string().describe("The skill which candidate is lacking"),
        severity: z.enum(['low', 'medium', 'high']).describe("The severity of the skill gap based on how important the skill is for the job role")
    })).describe("List of skill gaps in the candidate's profile along with their severity"),
    preparationPlan: z.array(z.object({
        day: z.number().describe("The day number in the preparation plan, starting from 1"),
        focus: z.string().describe("The main focus of this day in the preparation plan, e.g. data structures, system design, mock interviews etc"),
        tasks: z.array(z.string()).describe("List of tasks to be done on this day to follow the preparation plan, e.g. read a specific book or website")
    })).describe("A day-wise prepration plan for candidate to follow order to prepare for the interview effectively"),
    title: z.string().describe("The title of the interview report"),
});

console.log(JSON.stringify(zodToJsonSchema(interviewReportSchema), null, 2));
