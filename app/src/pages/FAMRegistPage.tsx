import { useParams, Navigate } from "react-router-dom"
import FAMRegist from "../components/FAMRegist";
import useAuth from "../hooks/useAuth";

export default function FAMRegistPage() {
    const param = useParams()
    const famId = param.id ?? "";

    const { session, loading } = useAuth()

    if (loading) {
        return <p>loading...</p>
    }

    if (!session) {
        return <Navigate to={'/'} replace />
    }

    return (
        <FAMRegist id={famId} />
    )
}