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
import { Box } from '@mui/material'
import LogoutPage from './pages/LogoutPage'

function App() {

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
          flexGrow: 1, // 親の残りスペースをすべて占める
          overflowY: 'auto', // コンテンツが多い場合にスクロールを許可
          display: 'flex',
          justifyContent: 'center', // 内部コンテンツを水平方向で中央揃え
          alignItems: 'center', // 内部コンテンツを垂直方向で中央揃え
          p: 2,
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
