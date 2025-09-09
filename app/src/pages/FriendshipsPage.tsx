import { Link } from "react-router-dom"
import FriendsList from "../components/FriendsList"
import FriendsRegist from "../components/FriendsRegist"
import FriendsPend from "../components/FriendsPend"

export default function FriendshipsPage() {

    return (
        <div>
            <Link to={'/'}>dashboard</Link>
            <FriendsPend />
            <FriendsList />
            <FriendsRegist />
        </div>
    )
}