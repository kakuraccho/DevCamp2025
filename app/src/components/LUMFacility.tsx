import { Grid } from "@mui/material";
import type { LUMItemProps } from "../types/types";
import LUMItem from "./LUMItem";

export default function LUMFacility({ data }: { data: LUMItemProps[] }) {
    return (
        <Grid container spacing={2} sx={{width: '100%', justifyContent: 'center'}}>
            {data.map(item => (
                <Grid item xs={6} key={item.id}>
                    <LUMItem item={item} />
                </Grid>
            ))}
        </Grid>
    )
}