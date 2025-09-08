import type { LUMItemProps } from "../types/types";

export default function Dryers({ data }: { data: LUMItemProps[] }) {

    return (
        <div>
            <ul>
                {data.map(item => (
                    <li key={item.id}>
                        <h1>{item.name}</h1>
                        <h2>{item.status}</h2>
                    </li>
                ))}
            </ul>
        </div>
    )
}