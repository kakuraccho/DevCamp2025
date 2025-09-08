import type { LUMItemProps } from "../types/types";
import { Link } from "react-router-dom";

export default function LUMItem({ item }: { item: LUMItemProps }) {

    return (
        <div>
            <h1>{item.name}</h1>
            <h2>{item.status}</h2>
            <Link to={`/lum/regist/${item.id}`}>regist</Link>
        </div>
    )
}