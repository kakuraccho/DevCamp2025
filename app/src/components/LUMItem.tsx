import type { LUMItemProps } from "../types/types";

export default function LUMItem({ item }: { item: LUMItemProps }) {

    return (
        <div>
            <h1>{item.name}</h1>
            <h2>{item.status}</h2>
        </div>
    )
}