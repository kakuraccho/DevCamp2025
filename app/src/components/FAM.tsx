import { useFriendData } from "../contexts/FriendContext";
import FAMList from "./FAMList";

export default function FAM() {
    const friendData = useFriendData()

    if (!friendData || friendData.length === 0) {
        return <p>フレンドはまだいません</p>
    }

    return (
        <div>
            <FAMList data={friendData} />
        </div>
    )
}