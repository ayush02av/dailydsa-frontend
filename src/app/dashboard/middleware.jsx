"use client"
import { useEffect, useContext, useState } from "react"
import Cookies from "js-cookie"
import { useRouter } from "next/navigation"
import axios from "axios"
import { context } from "../context"

export default function DashboardMiddleware() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const { setProfile } = useContext(context)

    useEffect(function () {
        if (!loading) {
            const token = Cookies.get('token')
            console.log('token', token)

            if (token == null || token == undefined)
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
                })
                .catch(function (error) {
                    console.log(error)
                })
        }
    }, [loading])

    return null
}