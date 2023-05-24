"use client"
import axios from "axios"
import { useEffect, useState } from "react"

function getShort(question) {
    question = question.split('/')
    question = question[question.length - 1]
    question = question.replaceAll('-', ' ')
    return question
}

function getDateClean(created_at) {
    created_at = created_at.replace('T', '-').split('-')
    return `${created_at[2]}/${created_at[1]}/${created_at[0].slice(2)}`
}

const difficultyLevels = ['Easy', 'Medium', 'Hard']

export default function Previous() {
    const [questions, setQuestions] = useState()

    useEffect(function () {
        if (questions == null) {
            axios.get(
                `${process.env.NEXT_PUBLIC_API_URL}/question/`,
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
        <div>
            <div className="text-xl font-bold mb-5">Previous Challenge</div>
            {
                questions && questions.map(function (question, index) {
                    return (
                        <a key={index} href={`/dashboard/challenge/${question.id}`} className="block ml-5 hover:underline">
                            {`${getDateClean(question.created_at)}`}: {difficultyLevels[question.difficulty_level - 1]}: {getShort(question.question_link)}
                        </a>
                    )
                })
            }
        </div>
    )
}