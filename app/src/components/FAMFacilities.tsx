// src/components/FAMFacilities.tsx

import React from 'react';
import { Box, Typography } from '@mui/material';
import type { FAMFacilitiesProps } from "../types/types";
import FriendItem from './FriendItem';

export default function FAMFacilities({ data, facilityInfo }: FAMFacilitiesProps) {
    return (
        <Box>
            <Typography variant="h5">{facilityInfo.name}</Typography>
            {data.length > 0 ? (
                <Box component="ul" sx={{ listStyle: 'none', p: 0 }}>
                    {data.map(item => (
                        <Box component="li" key={item.friend_id} sx={{ mb: 1 }}>
                            <FriendItem
                                friendId={item.friend_id}
                                friendName={item.friend_name || ''}
                                avatarUrl={item.friend_avatar_url || ''}
                            />
                        </Box>
                    ))}
                </Box>
            ) : (
                <Typography>フレンドは誰も利用していません</Typography>
            )}
        </Box>
    );
}