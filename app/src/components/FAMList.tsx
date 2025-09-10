import useFetchDB from "../hooks/useFetchDB";
import type { FriendsView } from "../types/types";
import FAMFacilities from "./FAMFacilities";

export default function FAMList({ data }: { data: FriendsView[] }) {
    const { data: allfacilities } = useFetchDB('fam_locations', null, null)

    const groupedData = data.reduce((acc, current) => {
        const locationId = current.fam_current_location_id

        if (locationId === null) {
            return acc;
        }

        if (!acc[locationId]) {
            acc[locationId] = []
        }

        acc[locationId].push(current)

        return acc
    }, {} as Record<string, FriendsView[]>)

    if (!allfacilities) return <p>loading...</p>

    return (
        <div>
            {allfacilities.map((facility) => {
                const usersInFacility = groupedData[facility.id] || []

                return (
                    <FAMFacilities
                        key={facility.id}
                        data={usersInFacility}
                        facilityInfo={facility}
                    />
                )
            }
            )}
        </div>
    )
}