import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import Layout from '@/components/Layout'
import ProtectedLayout from '@/components/ProtectedLayout'
import Home from '@/pages/Home'
import Wallet from '@/pages/Wallet'
import Transactions from '@/pages/Transactions'
import Exchange from '@/pages/Exchange'
import Trading from '@/pages/Trading'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Loading from '@/components/Loading'

import '@/App.css'

const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		children: [
			{
				index: true,
				element: <Home />,
			},
			{
				path: 'login',
				element: <Login />,
			},
			{
				path: 'register',
				element: <Register />,
			},
			{
        path: '/protected',
				element: <ProtectedLayout />,
        children: [
          {
            path: 'wallet',
            element: <Wallet />,
          },
          {
            path: 'transactions',
            element: <Transactions />,
          },
          {
            path: 'trading/:coin',
            element: <Trading />,
          },
        ]
			},
		],
	},
])

function App() {
	return <RouterProvider router={router} fallbackElement={<Loading />} />
}

export default App
