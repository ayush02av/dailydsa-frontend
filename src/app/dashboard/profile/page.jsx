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
                    redirect_uri: `${window?.location?.origin}/handler`
                }}
            >
                <LogoutButton />
            </Auth0Provider >

            {profile && (
                <div className="mt-5">
                    <div className="">{profile.nickname}</div>
                    <Image width={110} height={110} alt="" src={profile.picture} />
                    <div className="mt-2 text-lg">{profile.given_name} {profile.family_name}</div>
                </div>
            )}

        </div>
    )
}