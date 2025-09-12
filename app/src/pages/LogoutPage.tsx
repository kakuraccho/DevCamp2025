import { useNavigate } from "react-router-dom"
import { supabase } from "../supabaseClient"

export default function LogoutPage() {
    const navigate = useNavigate()
    const logout = async () => {
        await supabase.auth.signOut()
        navigate('/')
    }
    
    logout()

    return (
        <p>logouting...</p>
    )
}