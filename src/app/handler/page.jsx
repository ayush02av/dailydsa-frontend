"use client"
import { useAuth0 } from "@auth0/auth0-react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { context } from "../context"
import { useContext } from "react"
import Cookies from "js-cookie"
import axios from "axios"

export default function Handler() {
    const { isAuthenticated, isLoading, getIdTokenClaims } = useAuth0()
    const { setProfile } = useContext(context)

    const router = useRouter()

    useEffect(function () {
        if (!isLoading) {
            if (isAuthenticated) {
                getIdTokenClaims()
                    .then(function (response) {
                        axios.post(
                            `${process.env.NEXT_PUBLIC_API_URL}/auth/entry`,
                            {
                                'token': response.__raw
                            }
                        )
                            .then(function (response) {
                                Cookies.set('token', response.data.token)
                                setProfile(response.data)
                                router.push('/dashboard')
                            })
                            .catch(function (error) {
                                console.log(error)
                                router.push('/')
                            })
                    })
                    .catch(function (error) {
                        console.log(error)
                    })
            }
            else {
                console.log('not auth')
                router.push('/')
            }
        }
    }, [isLoading, isAuthenticated])

    return (
        <>
            {
                isLoading &&
                <div>Authenticating...</div>
            }
        </>
    )
}