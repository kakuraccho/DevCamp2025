import { Box, Grid } from "@mui/material";
import useFetchDB from "../hooks/useFetchDB";
import type { FriendsView } from "../types/types";
import FAMFacilities from "./FAMFacilities";

export default function FAMList({ data }: { data: FriendsView[] }) {
    const { data: allfacilities } = useFetchDB('fam_locations', null, null)
    const { data: allUserData } = useFetchDB('users', null, null);

    const groupedData = data.reduce((acc, current) => {
        const locationId = current.fam_current_location_id

        if (locationId === null) {
            return acc;
        }

        if (!acc[locationId]) {
            acc[locationId] = []
        }

        const userInfo = allUserData?.find(user => user.user_id === current.friend_id);
        const enrichedData = {
            ...current,
            friend_avatar_url: userInfo?.avatar_url || null
        };

        acc[locationId].push(enrichedData)

        return acc
    }, {} as Record<string, (FriendsView & { friend_avatar_url: string | null })[]>)

    if (!allfacilities || !allUserData) return <Box sx={{ textAlign: 'center', py: 4 }}>loading...</Box>

    return (
        <Grid container spacing={'30vw'} sx={{ justifyContent: 'center' }}>
            {allfacilities.map((facility) => {
                const usersInFacility = groupedData[facility.id] || []
                return (
                    <Grid item xs={12} sm={6} md={4} key={facility.id}>
                        <FAMFacilities
                            data={usersInFacility}
                            facilityInfo={facility}
                        />
                    </Grid>
                )
            })}
        </Grid>
    )
}