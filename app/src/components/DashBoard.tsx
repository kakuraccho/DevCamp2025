import { Box, Grid, Paper, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import LUMDashBoard from './LUMDashBoard';
import FAMDashBoard from './FAMDashBoard';
import FriendsPend from './FriendsPend';

export default function DashboardLayout() {
    return (
        <Box sx={{ flexGrow: 1, p: 3, display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 3, width: '30vw' }}>
                        <Paper elevation={2} sx={{
                            p: 2,
                            textAlign: 'center',
                            height: '20vh',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <FAMDashBoard />
                        </Paper>
                        <Link to="/fam" style={{ textDecoration: 'none' }}>
                            <Paper elevation={2} sx={{
                                p: 2,
                                height: '30vh',
                                flexGrow: 1,
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <Typography variant='h2'>FAM</Typography>
                                <Typography variant='h5'>Friend Activity Map</Typography>
                            </Paper>
                        </Link>
                    </Box>
                </Grid>

                <Grid item xs={12} md={4}>
                    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 3, width: '30vw' }}>
                        <Paper elevation={2} sx={{
                            p: 2,
                            textAlign: 'center',
                            height: '20vh',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <LUMDashBoard />
                        </Paper>
                        <Link to="/lum" style={{ textDecoration: 'none' }}>
                            <Paper elevation={2} sx={{
                                p: 2,
                                height: '30vh',
                                flexGrow: 1,
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <Typography variant='h2'>LUM</Typography>
                                <Typography variant='h5'>Laundry Usage Monitor</Typography>
                            </Paper>
                        </Link>
                    </Box>
                </Grid>

                <Grid item xs={12} md={4}>
                    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 3, width: '30vw' }}>
                        <Paper elevation={2} sx={{
                            p: 2,
                            textAlign: 'center',
                            height: '20vh',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <FriendsPend />
                        </Paper>
                        <Link to="/friendships" style={{ textDecoration: 'none' }}>
                            <Paper elevation={2} sx={{
                                p: 2,
                                height: '30vh',
                                flexGrow: 1,
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <Typography variant='h2'>Friends</Typography>
                            </Paper>
                        </Link>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}