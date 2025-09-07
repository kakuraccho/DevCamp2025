import './App.css'
import DashBoardPage from './pages/DashBoardPage'
import FAMPage from './pages/FAMPage'
import LUMPage from './pages/LUMPage'
import { Routes, Route } from 'react-router-dom'
import SettingPage from './pages/SettingPage'

function App() {

  return (
    <Routes>
      <Route path='/' element={<DashBoardPage />} />
      <Route path='/fam' element={<FAMPage />} />
      <Route path='/lum' element={<LUMPage floor={1} />} />
      <Route path='/setting' element={<SettingPage />} />
    </Routes>
  )
}

export default App
