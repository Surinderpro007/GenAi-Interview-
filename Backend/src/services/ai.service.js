const { GoogleGenAI } = require('@google/genai')

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY
});

async function genrateInterviewReport({ resume, selfDescription, jobDescription }) {

    const prompt = `You are an expert interview coach. Generate a detailed interview report for the candidate below.

Resume:
${resume}

Self Description:
${selfDescription}

Job Description:
${jobDescription}
`

    const response = await ai.models.generateContent({
       model: "gemini-2.5-flash",  
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: "OBJECT",
                properties: {
                    matchScore: {
                        type: "NUMBER",
                        description: "Score between 0-100 indicating how well candidate matches the job"
                    },
                    technicalQuestions: {
                        type: "ARRAY",
                        description: "Technical questions for the interview",
                        items: {
                            type: "OBJECT",
                            properties: {
                                question: { type: "STRING" },
                                intention: { type: "STRING" },
                                answer: { type: "STRING" }
                            },
                            required: ["question", "intention", "answer"]
                        }
                    },
                    behavioralQuestions: {
                        type: "ARRAY",
                        description: "Behavioral questions for the interview",
                        items: {
                            type: "OBJECT",
                            properties: {
                                question: { type: "STRING" },
                                intention: { type: "STRING" },
                                answer: { type: "STRING" }
                            },
                            required: ["question", "intention", "answer"]
                        }
                    },
                    skillGaps: {
                        type: "ARRAY",
                        description: "Skills the candidate is lacking",
                        items: {
                            type: "OBJECT",
                            properties: {
                                skill: { type: "STRING" },
                                severity: {
                                    type: "STRING",
                                    enum: ["low", "medium", "high"]
                                }
                            },
                            required: ["skill", "severity"]
                        }
                    },
                    preparationPlan: {
                        type: "ARRAY",
                        description: "Day-wise preparation plan",
                        items: {
                            type: "OBJECT",
                            properties: {
                                day: { type: "NUMBER" },
                                focus: { type: "STRING" },
                                tasks: {
                                    type: "ARRAY",
                                    items: { type: "STRING" }
                                }
                            },
                            required: ["day", "focus", "tasks"]
                        }
                    },
                    title: {
                        type: "STRING",
                        description: "Title of the interview report"
                    }
                },
                required: ["matchScore", "technicalQuestions", "behavioralQuestions", "skillGaps", "preparationPlan", "title"]
            }
        }
    })

    const result = JSON.parse(response.text);
    return result
}

module.exports = genrateInterviewReport