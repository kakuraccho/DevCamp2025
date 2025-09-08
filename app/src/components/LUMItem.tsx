import useRestTime from "../hooks/useRestTime";
import type { LUMItemProps } from "../types/types";
import { Link } from "react-router-dom";

export default function LUMItem({ item }: { item: LUMItemProps }) {

    const restTime = useRestTime(item.endtime || '')

    return (
        <div>
            <h1>{item.name}</h1>
            <h2>{item.status}</h2>
            {restTime ?
            <p>残り約 {restTime} 分</p> :
            null
            }
            <Link to={`/lum/regist/${item.id}`}>regist</Link>
        </div>
    )
}