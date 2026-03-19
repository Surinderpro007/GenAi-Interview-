// import { set } from "mongoose"
import { InterviewContext } from "../interview.context"
import {getInterviewReportById, getAllInterviewReports, genrateInterviewReport} from "../services/interview.api"
import { useContext } from "react"
import { useParams } from "react-router-dom"


export const useInterview  = () =>{
    const context = useContext(InterviewContext)
    const { interviewId } = useParams()
    
    if(!context){
        throw new Error("useInterview must be used within an InterviewProvider")
    }

    const {loading, setLoading, report, setReport, reports, setReports} = context

   const generateReport = async ({ jobDescription, selfDescription, resumeFile }) => {
    setLoading(true)
    try {
        const response = await genrateInterviewReport({ jobDescription, selfDescription, resumeFile })
        console.log("RAW RESPONSE:", response)
        if (!response?.interviewReport) return null
        setReport(response.interviewReport)
        return response.interviewReport
    } catch (err) {
        console.log(err)
    alert("Failed to generate report: " + (err.response?.data?.message || err.message))
        console.log(err)
        return null
    } finally {
        setLoading(false)
    }
}

const getReportById = async (id) => {
    setLoading(true)
    let response = null
    try {
        response = await getInterviewReportById(id)
        setReport(response?.interviewReport || null)
    } catch (err) {
        
        console.log(err)
    } finally {
        setLoading(false)
    }
    return response?.interviewReport || null
}

const getAllReports = async () => {
    setLoading(true)
    let response = null
    try {
        response = await getAllInterviewReports()
        setReports(response?.interviewReports || [])
    } catch (err) {
        console.log(err)
    } finally {
        setLoading(false)
    }
    return response?.interviewReports || []
}
const getResumePdf = async (id) => {
    try {
        // Simple approach: trigger download via API
        const response = await fetch(`/api/interview/${id}/resume-pdf`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = "resume.pdf"
        a.click()
        window.URL.revokeObjectURL(url)
    } catch (err) {
        console.log(err)
        alert("Failed to download resume")
    }
}

 return {loading, setLoading, report, setReport, reports, setReports, generateReport , getReportById, getAllReports,getResumePdf}

}