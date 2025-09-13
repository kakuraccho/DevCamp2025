import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { LUMProvider } from './contexts/LUMContext.tsx'
import './index.css'
import App from './App.tsx'
import { FriendProvider } from './contexts/FriendContext.tsx'
import { UserProvider } from './contexts/UserContext.tsx'

createRoot(document.getElementById('root')!).render(
  <UserProvider>
    <FriendProvider>
      <LUMProvider>
        <StrictMode>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </StrictMode>
      </LUMProvider>
    </FriendProvider>
  </UserProvider>
)
