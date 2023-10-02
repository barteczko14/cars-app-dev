import { Outlet } from 'react-router-dom'
import Navigation from '../components/Navigation'

function RootLayout(props) {
	return (
		<>
			{props.user ? <Navigation user={props.user} /> : ''}
			<main>
				<Outlet></Outlet>
			</main>
		</>
	)
}

export default RootLayout
