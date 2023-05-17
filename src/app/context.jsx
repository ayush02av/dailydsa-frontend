"use client"
import { createContext, useState } from "react"

export const context = createContext(null)

export default function Context({ children }) {
    const [profile, setProfile] = useState()

    return (
        <context.Provider
            value={{
                profile, setProfile
            }}
        >
            {children}
        </context.Provider>
    )
}