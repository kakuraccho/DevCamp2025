import { Stack, CircularProgress, Alert, Typography } from '@mui/material';
import useFetchFriends from "../hooks/useFetchFriends";
import FriendsItem from "./FriendsItem";

export default function FriendsList() {
    const { data: friends, loading: fetchLoading, error } = useFetchFriends();

    if (fetchLoading) {
        return <CircularProgress />;
    }

    if (error) {
        console.error(error);
        return <Alert severity="error">フレンド情報取得中にエラーが発生しました: {error}</Alert>;
    }

    if (!friends || friends.length === 0) {
        return <Typography variant="h6" sx={{ textAlign: 'center' }}>フレンドはまだいません</Typography>;
    }

    return (
        <Stack spacing={2}>
            {friends.map(item => (
                <FriendsItem
                    item={item}
                />
            ))}
        </Stack>
    );
}