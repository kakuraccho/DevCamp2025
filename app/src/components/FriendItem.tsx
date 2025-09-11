// src/components/FriendItem.tsx

import React from 'react';
import { Box, Typography, Avatar, CircularProgress, Alert } from '@mui/material';
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
    
    if (isLoading) {
        return (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CircularProgress size={24} />
                <Typography>読み込み中...</Typography>
            </Box>
        );
    }
    
    if (error) {
        return (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Alert severity="error">{error}</Alert>
            </Box>
        );
    }

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Avatar src={publicUrl || ''}>
                {getFallbackInitials()}
            </Avatar>
            <Typography>{friendName}</Typography>
        </Box>
    );
}