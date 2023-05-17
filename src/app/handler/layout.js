"use client"
import { Auth0Provider } from "@auth0/auth0-react"

export default function HandlerLayout({ children }) {
    return (
        <Auth0Provider
            domain={process.env.NEXT_PUBLIC_AUTH0_DOMAIN}
            clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENTID}
            authorizationParams={{
                redirect_uri: `${process.env.NEXT_PUBLIC_SERVER_URL}/handler`
            }}
        >
            {children}
        </Auth0Provider>
    )
}
