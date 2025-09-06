import { Link } from "react-router-dom"
import type { LUMPageProps } from "../types/types"
import useFetchDB from "../hooks/useFetchDB"

export default function LUMPage({ floor }: LUMPageProps) {

    const { data, loading, error } = useFetchDB('lum', 'floor', floor)

    if (error) {
        console.error('データの読込中にエラーが発生しました: ',error);
        return <p>データの読込中にエラーが発生しました</p>
    }

    if (loading) {
        return <p>{floor}階の情報を読込中...</p>
    }

    return (
        <div>
            <div>
                <Link to="/">dashboard</Link>
            </div>
            <h1>{floor}階の状況</h1>
            <ul>
                {data.map(item => (
                    <li key={item.id}>
                        <p>id: {item.id}</p>
                        <p>status: {item.status}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}