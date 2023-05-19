"use client"
import LoginButton from "@/components/loginbutton"
import { Auth0Provider } from "@auth0/auth0-react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
	const [token, setToken] = useState()
	const router = useRouter()

	useEffect(() => setToken(Cookies.get('token')), [token])

	return (
		<div
			className="bg-green-100 h-screen w-screen grid place-items-center"
		>
			{
				token ?
					<div
						className="bg-blue-400 text-white px-8 py-1 rounded font-bold cursor-pointer shadow-lg hover:shadow-xl"
						onClick={() => router.push('/dashboard')}
					>
						Go to Dashboard
					</div>
					: <Auth0Provider
						domain={process.env.NEXT_PUBLIC_AUTH0_DOMAIN}
						clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENTID}
						authorizationParams={{
							redirect_uri: `${process.env.NEXT_PUBLIC_SERVER_URL}/handler`
						}}
					>
						<LoginButton />
					</Auth0Provider >
			}
		</div>
	)
}