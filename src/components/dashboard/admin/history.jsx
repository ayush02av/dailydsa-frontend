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
                `${process.env.NEXT_PUBLIC_API_URL}/admin/history`,
                {
                    headers: {
                        token
                    }
                }
            )
                .then(function (response) {
                    console.log(response.data)
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
            <div className="text-xl font-bold mb-5">Submissions</div>
            <table className="w-full border text-center">
                <thead>
                    <th>User</th>
                    <th>Question</th>
                    <th>Submission</th>
                </thead>
                <tbody>
                    {
                        submissions && submissions.map(function (submission, index) {
                            return (
                                <tr key={index} className="border">
                                    <td>{submission.user}</td>
                                    <td><a target="_blank" href={submission.question_link} className="hover:underline">{submission.question_link}</a></td>
                                    <td><a target="_blank" href={submission.submission_link.startsWith('http') && submission.submission_link} className="hover:underline">{submission.submission_link}</a></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}