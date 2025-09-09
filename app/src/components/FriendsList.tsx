import useFetchFriends from "../hooks/useFetchFriends"
import FriendsItem from "./FriendsItem"

export default function FriendsList() {

    const { data: friends, loading: fetchLoading, error } = useFetchFriends()

    if (fetchLoading) {
        return <p>loading...</p>
    }

    if (error) {
        console.error(error)
        return <p>フレンド情報取得中にエラーが発生しました: {error}</p>
    }

    if (!friends || friends.length === 0) {
        return <p>フレンドはまだいません</p>
    }

    return (
        <div>
            <ul>
            {friends.map(item => (
                <FriendsItem item={item} />
            ))}
            </ul>
        </div>
    )
}