import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase.js";

export default function IndexPage() {
    const [user, loading] = useAuthState(auth);
    const navigate = useNavigate();
    useEffect(() => {
        if (loading) return;
        if (!user) return navigate("/login");
        navigate("/dashboard");
    }, [user, loading, navigate]);
    return <></>;
}
