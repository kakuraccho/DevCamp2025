import useFetchDB from "../hooks/useFetchDB";
import type { Friend } from "../types/types";

export default function FriendsItem({ item }: { item: Friend }) {

    const { data: user, loading, error } = useFetchDB('users', 'user_id', item.friend_id)

    if (loading) return <p>loading...</p>

    if (error) {
        console.error(error)
        return <p>フレンド情報取得中にエラーが発生しました: {error}</p>
    }

    return (
        <li key={user[0].user_id}>
            <p>{user[0].name} さん</p>
            <p>{user[0].roomid} 号室</p>
        </li>
    )
}