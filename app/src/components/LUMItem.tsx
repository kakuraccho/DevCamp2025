import { Box, Paper, Typography, Fab } from "@mui/material";
import useRestTime from "../hooks/useRestTime";
import type { LUMItemProps } from "../types/types";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function LUMItem({ item }: { item: LUMItemProps }) {
    const restTime = useRestTime(item.endtime || '')
    const { session } = useAuth()

    const getStatusColor = (status: string, isOwn?: boolean) => {
        if (isOwn) return '#2196f3';
        switch (status.toLowerCase()) {
            case 'free':
                return '#4caf50';
            case 'used':
                return '#f44336';
            default:
                return '#9e9e9e';
        }
    }

    // ユーザーIDを数値に変換するぷ
    const userId = session?.user.id ? session.user.id : null;
    
    // 自分の使用かどうかを正しく比較するぷ
    const isMyUsage = item.userid === userId;

    const statusColor = getStatusColor(item.status, isMyUsage);
    const showTime = item.status.toLowerCase() === 'used' || isMyUsage;

    return (
        <Paper
            elevation={2}
            sx={{
                position: 'relative',
                backgroundColor: '#f5f5f5',
                border: `4px solid ${statusColor}`,
                borderRadius: 2,
                overflow: 'hidden',
                width: '10vw'
            }}
        >
            <Fab
                size="small"
                sx={{
                    position: 'absolute',
                    top: -10,
                    right: -10,
                    backgroundColor: statusColor,
                    '&:hover': {
                        backgroundColor: statusColor,
                    },
                    width: 24,
                    height: 24,
                    minHeight: 24,
                    zIndex: 1
                }}
            />

            <Box
                component={Link}
                to={`/lum/regist/${item.id}`}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    height: 120,
                    textDecoration: 'none',
                    color: 'inherit',
                    cursor: 'pointer',
                    '&:hover': {
                        backgroundColor: 'rgba(0,0,0,0.04)'
                    }
                }}
            >
                <Box
                    sx={{
                        width: 80,
                        height: 80,
                        border: '3px solid #000',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#fff',
                        flexDirection: 'column'
                    }}
                >
                    {showTime && restTime ? (
                        <Typography
                            variant="body2"
                            sx={{
                                fontWeight: 'bold',
                                textAlign: 'center',
                                fontSize: '0.75rem'
                            }}
                        >
                            約{restTime}分
                        </Typography>
                    ) : null}
                </Box>
            </Box>
        </Paper>
    );
}