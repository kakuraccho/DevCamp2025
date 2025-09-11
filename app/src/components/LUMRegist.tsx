import { useState } from "react"
import useFetchDB from "../hooks/useFetchDB"
import { supabase } from "../supabaseClient"
import { useNavigate } from "react-router-dom"
import { Box, Typography, TextField, Button, CircularProgress, Alert } from "@mui/material"

export default function LUMRegist({ id }: { id: string }) {
    const { data: tableData, error: tableError, loading } = useFetchDB('lum', 'id', id)
    const [time, setTime] = useState<number>(0)
    const navigate = useNavigate()

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        )
    }

    if (tableError) {
        console.error(tableError)
        return (
            <Box sx={{ p: 4 }}>
                <Alert severity="error">データの取得中にエラーが発生しました: {tableError.message}</Alert>
            </Box>
        )
    }

    if (!tableData || tableData.length === 0) {
        return (
            <Box sx={{ p: 4, textAlign: 'center' }}>
                <Typography variant="h6">該当する洗濯機が見つかりません</Typography>
            </Box>
        )
    }

    const machine = tableData[0]

    if (machine.status !== 'free') {
        return (
            <Box sx={{ p: 4, textAlign: 'center' }}>
                <Typography variant="h6">{machine.name}は使用中です</Typography>
                <Button onClick={() => navigate(-1)} variant="outlined" sx={{ mt: 2 }}>
                    戻る
                </Button>
            </Box>
        )
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const valueAsNumber = parseInt(e.target.value, 10)
        setTime(isNaN(valueAsNumber) ? 0 : valueAsNumber)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (time <= 0) {
            alert('利用時間を正しく入力してください')
            return
        }

        const { error } = await (supabase as any).rpc('start_laundry_session', {
            machine_id_to_start: id,
            duration_in_minutes: time
        })

        if (error) {
            console.error('利用登録中にエラーが発生しました: ', error)
            return <Alert severity="error" sx={{ mt: 2 }}>利用登録中にエラーが発生しました: {error.message}</Alert>
        } else {
            alert('利用登録が完了しました')
            navigate('/')
        }
    }

    // 修正後
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh', // 画面の高さに合わせる
                p: 4
            }}
        >
            <Box
                sx={{
                    maxWidth: 400,
                    textAlign: 'center',
                    border: '1px solid #ccc',
                    borderRadius: 2,
                    p: 4
                }}
            >
                <Typography variant="h4" component="h1" gutterBottom>{machine.name}</Typography>
                <form onSubmit={handleSubmit}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mb: 2 }}>
                        <TextField
                            label="利用時間"
                            type="number"
                            name="time"
                            id="time"
                            value={time}
                            onChange={handleChange}
                            variant="outlined"
                            size="small"
                            sx={{ width: 100 }}
                        />
                        <Typography variant="body1">[min]</Typography>
                    </Box>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                    >
                        submit
                    </Button>
                </form>
            </Box>
        </Box>
    );
}