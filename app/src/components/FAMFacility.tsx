import useFetchDB from "../hooks/useFetchDB";
import type { Friend } from "../types/types";

export default function FAMFacility({ data }: { data: Friend[] }) {

    if (!data || data.length === 0) {
        return null
    }

    const locationId = data[0].fam_current_location_id

    const { data: facility, loading, error } = useFetchDB('fam_locations', 'id', locationId)

    if (loading) {
        <p>loading...</p>
    }

    if (error) {
        console.error(error);
        return <p>データの取得中にエラーが発生しました: {error}</p>
    }

    if (!facility || facility.length === 0) {
        return <p>フレンドは誰も利用していません</p>
    }

    return (
        <div>
            <h1>{facility[0].name}</h1>
            <ul>
                {data.map(item => (
                    <li key={item.friend_id}>
                        {item.friend_name}
                    </li>
                ))}
            </ul>
        </div>
    )
}