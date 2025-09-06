import { Link } from "react-router-dom"
import useAuth from "../hooks/useAuth"

export default function DashBoard() {
    const { logout } = useAuth()

    return (
        <div>
            <button onClick={logout}>logout</button>
            this is dashboard page.
            <Link to="/fam">fam</Link>
            <Link to="/lum">lum</Link>
        </div>
    )
}