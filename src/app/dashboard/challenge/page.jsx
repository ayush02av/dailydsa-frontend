"use client"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function Challenge() {
    const router = useRouter()

    useEffect(() => router.push('/dashboard'))

    return null

}