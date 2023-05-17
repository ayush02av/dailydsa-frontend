"use client"
import LoginButton from "@/components/loginbutton"
import { Auth0Provider } from "@auth0/auth0-react";

export default function Home() {
	return (
		<div
			className="bg-green-100 h-screen w-screen grid place-items-center"
		>
			<Auth0Provider
				domain={process.env.NEXT_PUBLIC_AUTH0_DOMAIN}
				clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENTID}
				authorizationParams={{
					redirect_uri: `${process.env.NEXT_PUBLIC_SERVER_URL}/handler`
				}}
			>
				<LoginButton />
			</Auth0Provider >
		</div>
	)
}