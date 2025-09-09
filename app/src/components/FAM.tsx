import useFetchFriends from "../hooks/useFetchFriends";
import FAMList from "./FAMList";

export default function FAM() {
    const { data, loading: friendLoading, error } = useFetchFriends()

    if (friendLoading) {
        return <p>loading...</p>;
    }

    if (!data || data.length === 0) {
        return <p>フレンドはまだいません</p>
    }

    if (error) {
        console.error(error)
        return <p>フレンド情報取得中にエラーが発生しました</p>
    }


    return (
        <div>
            <FAMList data={data} />
        </div>
    )
}