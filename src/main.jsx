import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {RouterProvider, createBrowserRouter} from 'react-router-dom'
import Home from './Pages/Home.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js'
import 'react-alice-carousel/lib/alice-carousel.css';
import CoinPage from './Pages/CoinPage.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    children: [
      {
        path: '/',
        element: <Home/>
      },
      {
        path: '/coin/:id',
        element: <CoinPage/>
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
  </Provider>
)
