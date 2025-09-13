import './App.css'
import DashBoardPage from './pages/DashBoardPage'
import FAMPage from './pages/FAMPage'
import LUMPage from './pages/LUMPage'
import { Routes, Route } from 'react-router-dom'
import SettingPage from './pages/SettingPage'
import LUMRegistPage from './pages/LUMRegistPage'
import FriendshipsPage from './pages/FriendshipsPage'
import FAMRegistPage from './pages/FAMRegistPage'
import AppbarWithDrawer from './components/AppBar'
import { Box, useMediaQuery, useTheme } from '@mui/material'
import LogoutPage from './pages/LogoutPage'

function App() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <AppbarWithDrawer />
      <Box
        sx={{
          flexGrow: 1,
          overflowY: 'auto',
          display: 'flex',
          justifyContent: 'center',
          alignItems: isMobile ? 'flex-start' : 'center', // モバイルでは上揃え
          p: isMobile ? 1 : 2, // モバイルでは余白を小さく
          pt: isMobile ? 2 : 2, // 上部の余白は確保
        }}
      >
        <Routes>
          <Route path='/' element={<DashBoardPage />} />
          <Route path='/fam' element={<FAMPage />} />
          <Route path='/fam/regist/:id' element={<FAMRegistPage />} />
          <Route path='/lum' element={<LUMPage />} />
          <Route path='/lum/regist/:id' element={<LUMRegistPage />} ></Route>
          <Route path='/setting' element={<SettingPage />} />
          <Route path='/friendships' element={<FriendshipsPage />} ></Route>
          <Route path='/logout' element={<LogoutPage />}></Route>
        </Routes>
      </Box>
    </Box>
  )
}

export default App