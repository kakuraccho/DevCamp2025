import FriendsList from "../components/FriendsList"
import FriendsRegist from "../components/FriendsRegist"
import FriendsPend from "../components/FriendsPend"

export default function FriendshipsPage() {

    return (
        <div>
            <FriendsPend />
            <FriendsList />
            <FriendsRegist />
        </div>
    )
}