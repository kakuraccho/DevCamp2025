import { useParams, Navigate } from "react-router-dom"
import useAuth from "../hooks/useAuth";
import LUMRegist from "../components/LUMRegist"

export default function LUMRegistPage() {
    const param = useParams()
    const lumId = param.id ?? "";

    const { session, loading } = useAuth()

    if (loading) {
        return <p>loading...</p>
    }
    
    if (!session) {
        return <Navigate to={'/'} replace />
    }

    return (
        <LUMRegist id={lumId} />
    )
}