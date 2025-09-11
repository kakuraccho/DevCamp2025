import useFetchDB from "../hooks/useFetchDB"
import { supabase } from "../supabaseClient"
import { useNavigate } from "react-router-dom"
import { Box, Typography, Button, CircularProgress, Alert, Stack } from "@mui/material"

export default function FAMRegist({ id }: { id: string }) {
    const { data: facility, loading, error } = useFetchDB('fam_locations', 'id', id)
    const navigate = useNavigate()

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        )
    }

    if (error) {
        console.error(error)
        return (
            <Box sx={{ p: 4 }}>
                <Alert severity="error">データの取得中にエラーが発生しました: {error}</Alert>
            </Box>
        )
    }

    if (!facility || facility.length === 0) {
        return (
            <Box sx={{ p: 4, textAlign: 'center' }}>
                <Typography variant="h6">施設が見つかりません</Typography>
            </Box>
        )
    }

    const handleEnter = async () => {
        const { error } = await supabase.rpc('enter_location', { u_location_id: parseInt(id) })
        if (error) {
            return <Alert severity="error" sx={{ mt: 2 }}>{error.message}</Alert>
        } else {
            alert('入室処理が完了しました')
            navigate('/')
        }
    }

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                p: 4,
                textAlign: 'center'
            }}
        >
            <Typography variant="h5" gutterBottom>
                {facility[0].name}に入室しますか？
            </Typography>
            <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                <Button onClick={handleEnter} variant="contained" color="primary">
                    yes
                </Button>
                <Button onClick={() => navigate('/')} variant="outlined" color="secondary">
                    no
                </Button>
            </Stack>
        </Box>
    )
}