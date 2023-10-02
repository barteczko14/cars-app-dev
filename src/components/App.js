import React, { useEffect, useState } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import firebase from 'firebase/compat/app'
import RootLayout from '../pages/Root'
import Dashboard from './Dashboard'
import Login from './Login'
import Search from './Search'
import Todos from './Todos'

function App() {
	const [user, setUser] = useState(null)

	useEffect(() => {
		const unsubscribe = firebase.auth().onAuthStateChanged(user => {
			if (user) {
				setUser(user)
			} else {
				setUser(null)
			}
		})
		return () => unsubscribe()
	}, [])

	const router = createBrowserRouter([
		{
			path: '/',
			element: <RootLayout user={user} />,
			children: [
				{ index: true, element: user ? <Dashboard user={user} /> : <Login /> },
				{ path: 'search', element: <Search /> },
				{ path: 'todos', element: <Todos /> },
			],
		},
		{
			path: 'login',
			element: <Login />,
		},
	])

	return (
		<>
			<RouterProvider router={router}></RouterProvider>
		</>
	)
}

export default App
