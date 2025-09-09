import type { LUMItemProps } from "../types/types"
import LUMItem from "./LUMItem"

export default function LUMLaundries({ data } : { data: LUMItemProps[] }) {

    return (
        <div>
            <ul>
                {data.map(item => (
                    <li key={item.id}>
                        <LUMItem item={item} />
                    </li>
                ))}
            </ul>
        </div>
    )
}