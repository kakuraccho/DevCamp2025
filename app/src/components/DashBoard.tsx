import { Box, Grid, Paper, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import LUMDashBoard from './LUMDashBoard';
import FAMDashBoard from './FAMDashBoard';
import FriendsPend from './FriendsPend';

export default function DashboardLayout() {
    return (
        <Box sx={{ flexGrow: 1, p: 3 }}>
            <Grid container spacing={3} justifyContent="center">
                <Grid item xs={12} sm={6} md={4}>
                    <Paper elevation={2} sx={{
                        p: { xs: 2, md: 4 },
                        height: { xs: 'auto', md: '200px' }, // PCでは高さを統一
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        textAlign: 'center'
                    }}>
                        <FAMDashBoard />
                    </Paper>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                    <Paper elevation={2} sx={{
                        p: { xs: 2, md: 4 },
                        height: { xs: 'auto', md: '200px' }, // PCでは高さを統一
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        textAlign: 'center'
                    }}>
                        <LUMDashBoard />
                    </Paper>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                    <Paper elevation={2} sx={{
                        p: { xs: 2, md: 4 },
                        height: { xs: 'auto', md: '200px' }, // PCでは高さを統一
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        textAlign: 'center'
                    }}>
                        <FriendsPend />
                    </Paper>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                    <Link to="/fam" style={{ textDecoration: 'none' }}>
                        <Paper elevation={2} sx={{
                            p: { xs: 2, md: 4 },
                            height: { xs: 'auto', md: '300px' }, // PCでは高さを統一
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <Typography variant='h2'>FAM</Typography>
                            <Typography variant='h5'>Friend Activity Map</Typography>
                        </Paper>
                    </Link>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                    <Link to="/lum" style={{ textDecoration: 'none' }}>
                        <Paper elevation={2} sx={{
                            p: { xs: 2, md: 4 },
                            height: { xs: 'auto', md: '300px' }, // PCでは高さを統一
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <Typography variant='h2'>LUM</Typography>
                            <Typography variant='h5'>Laundry Usage Monitor</Typography>
                        </Paper>
                    </Link>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                    <Link to="/friendships" style={{ textDecoration: 'none' }}>
                        <Paper elevation={2} sx={{
                            p: { xs: 2, md: 4 },
                            height: { xs: 'auto', md: '300px' }, // PCでは高さを統一
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <Typography variant='h2'>Friends</Typography>
                            <Typography variant='h5'>Friend Activity Map</Typography>
                        </Paper>
                    </Link>
                </Grid>
            </Grid>
        </Box>
    );
}