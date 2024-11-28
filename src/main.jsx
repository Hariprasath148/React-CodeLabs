import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createHashRouter, createRoutesFromElements, Route, Router, RouterProvider } from 'react-router-dom'
import { RootLayout } from './layout/RootLayout'
import { Home } from './pages/Home'
import { QRgenerator } from './pages/QRgenerator'
import 'bootstrap/dist/css/bootstrap.min.css'; 

const router = createHashRouter (
  createRoutesFromElements(
    <Route path="/" element={<RootLayout/>}>
      <Route index element={<Home />}/>
      <Route path="QR" element={<QRgenerator />}/>
    </Route>
  )
)


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
