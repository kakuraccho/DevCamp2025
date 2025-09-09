import type { Friend } from "../types/types";
import FAMFacility from "./FAMFacility";

export default function FAMList({ data }: { data: Friend[] }) {

    const groupedData = data.reduce((acc, current) => {
        const key = current.fam_current_location_id

        if (!acc[key]) {
            acc[key] = []
        }

        acc[key].push(current)

        return acc
    }, {} as Record<string, Friend[]>)

    return (
        <div>
            {Object.entries(groupedData).map(([groupId, items]) => (
                <div key={groupId}>
                    <FAMFacility data={items} />
                </div>
            ))}
        </div>
    )
}