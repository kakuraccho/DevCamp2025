import './App.css'
import DashBoardPage from './pages/DashBoardPage'
import FAMPage from './pages/FAMPage'
import LUMPage from './pages/LUMPage'
import { Routes, Route } from 'react-router-dom'
import SettingPage from './pages/SettingPage'
import LUMRegistPage from './pages/LUMRegistPage'
import FriendshipsPage from './pages/FriendshipsPage'

function App() {

  return (
    <Routes>
      <Route path='/' element={<DashBoardPage />} />
      <Route path='/fam' element={<FAMPage />} />
      <Route path='/lum' element={<LUMPage />} />
      <Route path='/lum/regist/:id' element={<LUMRegistPage />} ></Route>
      <Route path='/setting' element={<SettingPage />} />
      <Route path='/friendships' element={<FriendshipsPage />} ></Route>
    </Routes>
  )
}

export default App
