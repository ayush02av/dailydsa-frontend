"use client"
import { context } from "@/app/context"
import { useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import Cookies from "js-cookie"

const difficultyLevels = ['Easy', 'Medium', 'Hard']

export default function Add() {
    const router = useRouter()
    const { profile } = useContext(context)

    const [questionLink, setQuestionLink] = useState('')
    const [solutionLink, setSolutionLink] = useState('')
    const [difficultyLevel, setDifficultyLevel] = useState(1)

    const [buttonAvailable, setButtonAvailable] = useState(true)

    useEffect(function () {
        if (!profile) router.push('/')
        else if (!profile.is_admin) router.push('/dashboard/profile')
    }, [profile])

    function handleSubmit() {
        const token = Cookies.get('token')
        setButtonAvailable(false)
        axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/admin/add/`,
            {
                questionLink,
                solutionLink,
                difficultyLevel
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
        <div className="text-center md:px-20">
            <div className="text-2xl font-bold mb-5">Add Question</div>
            <input
                type="text"
                className="md:w-3/4 px-6 py-2 outline-none rounded bg-gray-100 text-black"
                name="question-link"
                value={questionLink}
                onChange={(e) => setQuestionLink(e.target.value)}
                placeholder="Question link"
            />
            <br /><br />
            <input
                type="text"
                className="md:w-3/4 px-6 py-2 outline-none rounded bg-gray-100 text-black"
                name="solution-link"
                value={solutionLink}
                onChange={(e) => setSolutionLink(e.target.value)}
                placeholder="Solution link"
            />
            <br /><br />
            {difficultyLevels[difficultyLevel - 1]} <input
                type="range"
                name="difficulty-level"
                value={difficultyLevel}
                onChange={(e) => setDifficultyLevel(e.target.value)}
                min={1}
                max={3}
            />
            <br /><br />
            <br /><br />
            <button
                className={`px-6 py-3 cursor-pointer rounded bg-blue-400 text-white ${!buttonAvailable && `opacity-50`}`}
                onClick={handleSubmit}
                disabled={!buttonAvailable}
            >
                Submit
            </button>
        </div>
    )
}