import { Link } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import LUMDashBoard from "./LUMDashBoard"
import FAMDashBoard from "./FAMDashBoard"

export default function DashBoard() {
    const { logout } = useAuth()

    return (
        <div>
            <button onClick={logout}>logout</button>
            this is dashboard page.
            <ul>
                <li>
                    <Link to="/fam">fam</Link>
                    <FAMDashBoard />
                </li>
                <li>
                    <Link to="/lum">lum</Link>
                    <LUMDashBoard />
                </li>
                <li>
                    <Link to="/setting">setting</Link>
                </li>
                <li>
                    <Link to={'/friendships'}>friends</Link>
                </li>
            </ul>
        </div>
    )
}