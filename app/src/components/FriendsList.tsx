import { Stack, CircularProgress, Alert, Typography, Paper, Box } from '@mui/material';
import useFetchFriends from "../hooks/useFetchFriends";
import FriendsItem from "./FriendsItem";

export default function FriendsList() {
    const { data: friends, loading: fetchLoading, error } = useFetchFriends();

    if (fetchLoading) {
        return (
            <Box sx={{ p: 2, textAlign: 'center' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        console.error(error);
        return <Alert severity="error">フレンド情報取得中にエラーが発生しました: {error}</Alert>;
    }

    if (!friends || friends.length === 0) {
        return <Typography variant="h6" sx={{ textAlign: 'center', p: 2 }}>フレンドはまだいません</Typography>;
    }

    return (
        <Paper elevation={3} sx={{ p: 2, borderRadius: 2 }}>
            <Stack spacing={2}>
                {friends.map(item => (
                    <FriendsItem
                        key={item.friend_id} // keyを追加
                        item={item}
                    />
                ))}
            </Stack>
        </Paper>
    );
}