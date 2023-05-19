"use client"
import { useEffect, useContext } from "react"
import Cookies from "js-cookie"
import { useRouter } from "next/navigation"
import axios from "axios"
import { context } from "../context"

export default function DashboardMiddleware() {
    const router = useRouter()
    const { setProfile } = useContext(context)

    useEffect(function () {
        const token = Cookies.get('token')

        if (token == null || token == undefined)
            router.push('/')

        axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/user/profile`,
            {
                headers: {
                    token: token
                }
            }
        )
            .then(function (response) {
                setProfile(response.data)
            })
            .catch(function (error) {
                console.log(error)
            })

    })

    return null
}