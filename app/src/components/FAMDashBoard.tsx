import { Typography, CircularProgress, Box } from '@mui/material';
import useFetchDB from "../hooks/useFetchDB";

export default function FAMDashBoard() {
    const { data: bathData, loading: bathLoading, error: bathError } = useFetchDB('users', 'fam_current_location_id', 1);
    const { data: cafeData, loading: cafeLoading, error: cafeError } = useFetchDB('users', 'fam_current_location_id', 2);

    if (bathLoading || cafeLoading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (bathError || cafeError) {
        console.error(bathError, cafeError);
        return (
            <Typography color="error" variant="body2" sx={{ textAlign: 'center' }}>
                エラーが発生しました。
            </Typography>
        );
    }

    return (
        <Box sx={{ textAlign: 'center', p: 1 }}>
            <Typography variant="body1">風呂には {bathData?.length || 0} 人います</Typography>
            <Typography variant="body1">食堂には {cafeData?.length || 0} 人います</Typography>
        </Box>
    );
}