import Auth from "../components/Auth"
import DashBoard from "../components/DashBoard"
import useAuth from "../hooks/useAuth"

export default function DashBoardPage() {
    const { session } = useAuth()

    return (
        <div>
            {session ?
            <DashBoard />:
            <Auth />
            }
        </div>
    )
}