import { useEffect, useState } from "react";
import { Typography, Button, CircularProgress, Alert, Box, List, ListItem, ListItemText, Paper } from '@mui/material';
import useAuth from "../hooks/useAuth";
import { supabase } from "../supabaseClient";
import type { PendingRequest } from "../types/types";

export default function FriendsPend() {
    const { session, loading: authLoading } = useAuth();
    const myUserId = session?.user.id;

    const [requests, setRequests] = useState<PendingRequest[]>([]);
    const [dataLoading, setDataLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!myUserId) {
            setDataLoading(false);
            return;
        }

        const fetchPendingRequests = async () => {
            const { data, error: fetchError } = await supabase
                .from('friendships')
                .select(`
                    *,
                    requester:users!requester_id ( name, user_id )
                `)
                .eq('status', 'pending')
                .eq('receiver_id', myUserId);
            
            if (fetchError) {
                setError(fetchError.message);
            } else if (data) {
                setRequests(data);
            }
            setDataLoading(false);
        };
        fetchPendingRequests();
    }, [myUserId]);

    const handleAccept = async (requester_id: string) => {
        const { error } = await supabase.rpc('accept_friend_request', {
            p_requester_id: requester_id
        });
        if (error) {
            alert(`承認中にエラーが発生しました: ${error.message}`);
        } else {
            alert('承認が完了しました');
            setRequests(prev => prev.filter(
                req => req.requester_id !== requester_id
            ));
        }
    };

    if (authLoading || dataLoading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                <Alert severity="error">エラーが発生しました: {error}</Alert>
            </Box>
        );
    }

    if (requests.length === 0) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                <Typography variant="body1">承認待ちのフレンドはいません</Typography>
            </Box>
        );
    }

    return (
        <Paper elevation={3} sx={{ p: 2, borderRadius: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                <Typography variant="body1" sx={{ textAlign: 'center', mb: 1 }}>承認待ちのフレンド</Typography>
                <List sx={{ width: '100%' }}>
                    {requests.map(item => (
                        <Paper key={item.requester_id} elevation={1} sx={{ p: 1, my: 1, borderRadius: 1 }}>
                            <ListItem disablePadding>
                                <ListItemText primary={`${item.requester.name} さん`} />
                                <Button
                                    variant="contained"
                                    color="success"
                                    onClick={() => handleAccept(item.requester_id)}
                                    size="small"
                                >
                                    承認
                                </Button>
                            </ListItem>
                        </Paper>
                    ))}
                </List>
            </Box>
        </Paper>
    );
}