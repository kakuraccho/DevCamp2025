import { Box, Avatar, CircularProgress } from '@mui/material';
import { useAvatar } from '../hooks/useAvatar';

interface FriendItemProps {
    friendId: string | null;
    friendName: string;
    avatarUrl: string | null;
}

export default function FriendItem({ friendId, friendName, avatarUrl }: FriendItemProps) {
    const { publicUrl, isLoading, error, getFallbackInitials } = useAvatar({
        userId: friendId,
        avatarUrl: avatarUrl,
        fallbackText: friendName
    });

    console.log(`Friend: ${friendName}, UserID: ${friendId}`);
    console.log(`  isLoading: ${isLoading}, error: ${error}`);
    console.log(`  publicUrl: ${publicUrl}`);
    console.log(`  avatarUrl: ${avatarUrl}`)
   
    if (isLoading) {
        return (
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <CircularProgress size={32} />
            </Box>
        );
    }
   
    if (error) {
        return (
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Avatar sx={{ width: 48, height: 48, bgcolor: 'error.main' }}>
                    !
                </Avatar>
            </Box>
        );
    }

    return (
        <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            flexDirection: 'column',
            gap: 0.5
        }}>
            <Avatar 
                src={publicUrl || ''} 
                sx={{ 
                    width: 48, 
                    height: 48,
                    border: '2px solid #fff',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                }}
            >
                {getFallbackInitials()}
            </Avatar>
        </Box>
    );
}