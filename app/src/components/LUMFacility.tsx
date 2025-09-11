import { Grid } from "@mui/material";
import type { LUMItemProps } from "../types/types";
import LUMItem from "./LUMItem";

export default function LUMFacility({ data }: { data: LUMItemProps[] }) {
    return (
        <Grid container spacing={'10vw'}>
            {data.map(item => (
                <Grid xs={6} key={item.id}>
                    <LUMItem item={item} />
                </Grid>
            ))}
        </Grid>
    )
}
