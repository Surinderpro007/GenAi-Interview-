import axios from "axios"

const api = axios.create({
     baseURL: 'https://genai-interview-production.up.railway.app/',
     withCredentials:true,
})

/**
 * 
 * @desc param0 
 * @returns 
 */
export const genrateInterviewReport = async ({ resumeFile, selfDescription, jobDescription }) => {
    const formData = new FormData()
    if (resumeFile) formData.append("resume", resumeFile)
    formData.append("selfDescription", selfDescription)
    formData.append("jobDescription", jobDescription)

    const response = await api.post("/api/interview", formData, {
        headers: { "Content-Type": "multipart/form-data" }
    })
    return response.data  // ✅ return only data
}

export const getInterviewReportById = async(interviewId) =>{
    const response = await api.get(`/api/interview/report/${interviewId}`)
    return response.data
}

export const getAllInterviewReports = async() =>{
    const response = await api.get("/api/interview")
    return response.data
}
