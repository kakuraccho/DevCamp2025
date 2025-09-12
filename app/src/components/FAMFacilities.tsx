import { Box, Typography } from '@mui/material';
import type { FAMFacilitiesProps } from "../types/types";
import FriendItem from './FriendItem';

export default function FAMFacilities({ data, facilityInfo }: FAMFacilitiesProps) {
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2
        }}>
            {/* 施設名 */}
            <Typography
                variant="h6"
                sx={{
                    fontWeight: 'bold',
                    color: 'text.primary',
                    textAlign: 'center'
                }}
            >
                {facilityInfo.name}
            </Typography>

            {/* 円形エリア */}
            <Box
                sx={{
                    width: { xs: 200, sm: 250, md: 500 },
                    height: { xs: 200, sm: 250, md: 500 },
                    border: '4px solid #000',
                    borderRadius: '50%',
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 1,
                    p: 2,
                    position: 'relative',
                    backgroundColor: '#fff'
                }}
            >
                {data.length > 0 ? (
                    data.map((item, index) => {
                        return (
                            <Box
                                key={item.friend_id}
                                sx={{
                                    position: 'absolute',
                                    transform: `rotate(${(360 / data.length) * index}deg) translateY(-80px)`,
                                }}
                            >
                                <Box sx={{ transform: `rotate(${-(360 / data.length) * index}deg)` }}>
                                    <FriendItem
                                        friendId={item.friend_id}
                                        friendName={item.friend_name || ''}
                                        avatarUrl={item.friend_avatar_url || ''}
                                    />
                                </Box>
                            </Box>
                        )})
                ) : (
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ textAlign: 'center' }}
                    >
                        フレンドは誰も利用していません
                    </Typography>
                )}
            </Box>
        </Box>
    );
}