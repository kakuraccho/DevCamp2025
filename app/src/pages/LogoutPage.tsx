import { useNavigate } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import { useEffect } from "react"

export default function LogoutPage() {
    const navigate = useNavigate()
    const { logout, loading } = useAuth()

    useEffect(() => {
        logout()

        if (!loading) navigate('/')
    })

    return (
        <p>logouting...</p>
    )
}