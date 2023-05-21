"use client"
import axios from "axios"
import Cookies from "js-cookie"
import { useEffect, useState } from "react"

export default function History() {
    const [submissions, setSubmissions] = useState()
    const token = Cookies.get('token')

    useEffect(function () {
        if (submissions == null) {
            axios.get(
                `${process.env.NEXT_PUBLIC_API_URL}/user/history`,
                {
                    headers: {
                        token
                    }
                }
            )
                .then(function (response) {
                    setSubmissions(response.data)
                })
                .catch(function (error) {
                    console.log(error)
                })
        }

    }, [submissions])

    return (
        <div
            className="px-5 py-2 m-5"
            style={{ height: '80px' }}
        >
            <div className="text-xl font-bold mb-5">My Submissions</div>
            <div className="font-semibold mb-5">Today:</div>
            {
                submissions && submissions?.today.map(function (submission, index) {
                    return (
                        <a key={index} target="_blank" href={submission.submission_link.startsWith('http') ? submission.submission_link : submission.question_link} className="block ml-5 mb-2 hover:underline">
                            {submission.question_link}
                        </a>
                    )
                })
            }
            <div className="font-semibold mt-10 mb-5">Previous:</div>
            {
                submissions && submissions?.previous.map(function (submission, index) {
                    return (
                        <a key={index} target="_blank" href={submission.submission_link.startsWith('http') ? submission.submission_link : submission.question_link} className="block ml-5 mb-2 hover:underline">
                            {submission.question_link}
                        </a>
                    )
                })
            }
        </div>
    )
}