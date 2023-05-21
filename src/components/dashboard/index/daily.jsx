"use client"
import axios from "axios"
import { useEffect, useState } from "react"

function getShort(question) {
    question = question.split('/')
    question = question[question.length - 1]
    question = question.replaceAll('-', ' ')
    return question
}

const difficultyLevels = ['Easy', 'Medium', 'Hard']

export default function Daily() {
    const [questions, setQuestions] = useState()

    useEffect(function () {
        if (questions == null) {
            axios.get(
                `${process.env.NEXT_PUBLIC_API_URL}/question/daily`,
            )
                .then(function (response) {
                    setQuestions(response.data)
                })
                .catch(function (error) {
                    console.log(error)
                })
        }

    }, [questions])

    return (
        <div
            className="px-5 py-2 m-5 mt-0"
        >
            <div className="text-xl font-bold mb-5">Daily Challenge</div>
            {
                questions && questions.map(function (question, index) {
                    return (
                        <a key={index} href={`/dashboard/challenge/${question.id}`} className="block ml-5 hover:underline">
                            {difficultyLevels[question.difficulty_level - 1]}: {getShort(question.question_link)}
                        </a>
                    )
                })
            }
        </div>
    )
}