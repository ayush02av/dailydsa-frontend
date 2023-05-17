import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LogoutButton = () => {
    const { logout } = useAuth0();

    return (
        <button
            className="text-red-500 font-bold shadow px-2 py-1 rounded"
            onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
        >
            Log Out
        </button>
    );
};

export default LogoutButton;