"use client"
import { useAuth0 } from "@auth0/auth0-react"
import { useRouter } from "next/navigation"
import CryptoJS from "crypto-js"
import { useEffect } from "react"
import { context } from "../context"
import { useContext } from "react"

function base64url(source) {
    return CryptoJS.enc.Base64
        .stringify(source)
        .replace(/=+$/, '')
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
}

function encode(data) {
    return base64url(CryptoJS.enc.Utf8.parse(JSON.stringify(data)))
}

function encrypt(data, secret) {
    return base64url(CryptoJS.HmacSHA256(data, secret))
}

function getToken(data) {
    var header = {
        "alg": "HS256",
        "typ": "JWT"
    }

    var token = encode(header) + "." + encode(data)
    token = token + "." + encrypt(token, process.env.NEXT_PUBLIC_TEMP_JWT_SECRET)

    return token
}

export default function Handler() {
    const { user, isAuthenticated, isLoading } = useAuth0()
    const { setProfile } = useContext(context)

    const router = useRouter()

    useEffect(function () {
        if (!isLoading) {
            if (isAuthenticated) {
                router.push('/dashboard')
                setProfile(user)
            }
            else router.push('/')
        }
    }, [isLoading, user, isAuthenticated])

    return (
        <>
            {
                isLoading &&
                <div>Loading...</div>
            }
        </>
    )
}