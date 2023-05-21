"use client"
import { useEffect, useContext, useState } from "react"
import Cookies from "js-cookie"
import { useRouter } from "next/navigation"
import axios from "axios"
import { context } from "./context"

export default function Middleware() {
    const router = useRouter()
    const [loading, setLoading] = useState(true)
    const { setProfile } = useContext(context)

    useEffect(function () {
        if (loading) {
            const token = Cookies.get('token')

            if (token == null || token == undefined)
                if (window.location.pathname.startsWith('/dashboard'))
                    router.push('/')

            axios.get(
                `${process.env.NEXT_PUBLIC_API_URL}/user/profile`,
                {
                    headers: {
                        token
                    }
                }
            )
                .then(function (response) {
                    setProfile(response.data)
                    setLoading(false)
                })
                .catch(function (error) {
                    console.log(error)
                })
        }
    }, [loading])

    return null
}