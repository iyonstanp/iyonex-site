import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import IyonexPro from './IyonexPro.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <IyonexPro />
  </StrictMode>,
)