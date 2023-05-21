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
			className="grid place-items-center"
			style={{ height: `90vh` }}
		>
			<div className="px-2 md:px-0 text-center">
				<div className="mb-20">
					<div className="text-4xl md:text-6xl font-bold mb-10">
						Elevate your skills, <br />one day at a time
					</div>
					<div>
						Your go-to platform for daily coding tracking,
						<br />
						helping you conquer challenges effortlessly.
					</div>
				</div>
				{token ?
					<div
						className="bg-black text-white inline-block px-8 py-1 rounded font-bold cursor-pointer shadow-lg hover:shadow-xl"
						onClick={() => router.push('/dashboard')}
					>
						Go to Dashboard
					</div>
					: <div className="inline-block">
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
				}
			</div>
		</div>
	)
}