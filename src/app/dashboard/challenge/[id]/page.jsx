"use client"
import axios from "axios"
import Cookies from "js-cookie"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function Challenge() {
    const router = useRouter()
    const questionID = parseInt(window.location.pathname.split('/').slice(-1))

    const [question, setQuestion] = useState(null)
    const [submissionLink, setSubmissionLink] = useState('')

    const [buttonAvailable, setButtonAvailable] = useState(true)

    useEffect(function () {
        if (!question)
            axios.get(
                `${process.env.NEXT_PUBLIC_API_URL}/question/${questionID}`,
            )
                .then((response) => setQuestion(response.data))
                .catch((error) => router.push('/dashboard'))
    }, [question])

    function handleSubmit() {
        const token = Cookies.get('token')
        setButtonAvailable(false)
        axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/user/add/`,
            {
                questionID,
                submissionLink
            },
            {
                headers: {
                    token
                }
            }
        )
            .then(function (response) {
                setButtonAvailable(true)
                window.alert('Added')
                router.push('/dashboard')
            })
            .catch(function (error) {
                window.alert(error.response.data.detail)
            })
    }

    return (
        <div>
            <div className="text-xl font-bold">Challenge</div>

            {question && (
                <div className="ml-2 md:ml-5 mt-5">
                    <a href={question.question_link} className="hover:underline block" target="_blank">{question.question_link}</a>

                    <input
                        type="text"
                        className="md:w-1/2 px-6 py-2 outline-none rounded bg-gray-100 text-black block mt-3"
                        name="submission-link"
                        value={submissionLink}
                        onChange={(e) => setSubmissionLink(e.target.value)}
                        placeholder="Submission link"
                    />

                    <div
                        className={`bg-black text-white inline-block mt-5 px-6 py-3 cursor-pointer rounded ${!buttonAvailable && `opacity-50`}`}
                        onClick={handleSubmit}
                        disabled={!buttonAvailable}
                    >
                        Submit
                    </div>

                </div>
            )}

        </div>
    )
}