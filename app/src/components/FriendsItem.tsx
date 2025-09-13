import { ListItem, ListItemAvatar, Avatar, ListItemText, Typography, CircularProgress, Alert, Paper, Box } from '@mui/material';
import useFetchDB from "../hooks/useFetchDB";
import type { Friend } from "../types/types";

export default function FriendsItem({ item }: { item: Friend }) {
    const { data: user, loading, error } = useFetchDB('users', 'user_id', item.friend_id);

    if (loading) {
        return (
            <Box sx={{ p: 1, textAlign: 'center' }}>
                <CircularProgress size={20} />
            </Box>
        );
    }

    if (error) {
        console.error(error);
        return (
            <Alert severity="error">エラーが発生しました</Alert>
        );
    }
    
    if (!user || user.length === 0) {
        return null;
    }

    const friendUser = user[0];

    return (
        <Paper elevation={1} sx={{ p: 1, borderRadius: 1 }}>
            <ListItem disablePadding sx={{ width: '100%' }}>
                <ListItemAvatar>
                    <Avatar src={`https://noddrgxpwmzmsucwumyf.supabase.co/storage/v1/object/public/avatars/${friendUser.avatar_url}` || ''} />
                </ListItemAvatar>
                <ListItemText
                    primary={
                        <Typography variant="body1" component="p">
                            {friendUser.name} さん
                        </Typography>
                    }
                    secondary={
                        <Typography variant="body2" color="text.secondary">
                            {friendUser.roomid} 号室
                        </Typography>
                    }
                />
            </ListItem>
        </Paper>
    );
}