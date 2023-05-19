"use client"
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
    const { loginWithRedirect } = useAuth0();

    return (
        <div
            className="bg-blue-400 text-white px-8 py-1 rounded font-bold cursor-pointer shadow-lg hover:shadow-xl"
            onClick={() => loginWithRedirect()}
        >
            Get Started
        </div>
    )
};

export default LoginButton;