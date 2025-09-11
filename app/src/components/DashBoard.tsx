import { Box, Grid, Paper, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import LUMDashBoard from './LUMDashBoard';
import FAMDashBoard from './FAMDashBoard';
import FriendsPend from './FriendsPend';

export default function DashboardLayout() {
    return (
        <Box sx={{ flexGrow: 1, p: 3, display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
            <Grid container spacing={3}>
                {/* === 1列目: fam関連 === */}
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
                        {/* famのリンク */}
                        <Link to="/fam" style={{ textDecoration: 'none' }}>
                            <Paper elevation={2} sx={{
                                p: 2,
                                height: '30vh',
                                flexGrow: 1,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <Typography variant='h2'>fam</Typography>
                            </Paper>
                        </Link>
                    </Box>
                </Grid>

                {/* === 2列目: lum関連 === */}
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
                        {/* lumのリンク */}
                        <Link to="/lum" style={{ textDecoration: 'none' }}>
                            <Paper elevation={2} sx={{
                                p: 2,
                                height: '30vh',
                                flexGrow: 1,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <Typography variant='h2'>lum</Typography>
                            </Paper>
                        </Link>
                    </Box>
                </Grid>

                {/* === 3列目: friends関連 === */}
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
                        {/* friendsのリンク */}
                        <Link to="/friendships" style={{ textDecoration: 'none' }}>
                            <Paper elevation={2} sx={{
                                p: 2,
                                height: '30vh',
                                flexGrow: 1,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <Typography variant='h2'>friends</Typography>
                            </Paper>
                        </Link>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}