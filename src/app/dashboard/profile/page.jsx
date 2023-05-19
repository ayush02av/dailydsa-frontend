"use client"
import LogoutButton from "@/components/logoutbutton"
import { Auth0Provider } from "@auth0/auth0-react"
import Image from "next/image"

import { context } from "@/app/context"
import { useContext } from "react"

export default function Profile() {
    const { profile } = useContext(context)

    return (
        <div>
            <Auth0Provider
                domain={process.env.NEXT_PUBLIC_AUTH0_DOMAIN}
                clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENTID}
                authorizationParams={{
                    redirect_uri: `${process.env.NEXT_PUBLIC_SERVER_URL}/handler`
                }}
            >
                <LogoutButton />
            </Auth0Provider >

            {profile && (
                <div className="mt-5">
                    <div className="">{profile.username}</div>
                    <Image width={110} height={110} alt="" src={profile.picture} />
                    <div className="mt-2 text-lg">{profile.first_name} {profile.last_name}</div>
                </div>
            )}

        </div>
    )
}