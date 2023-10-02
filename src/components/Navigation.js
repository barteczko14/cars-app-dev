import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Navbar, Nav, Container } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { getAuth, signOut } from 'firebase/auth'
import Button from './Button'

const Navigation = user => {
	const [error, setError] = useState('')
	const navigate = useNavigate()
	
	const handleLogout = () => {
		const auth = getAuth()
		signOut(auth)
			.then(() => {
				navigate('/login')
			})
			.catch(error => {
				setError('Wylogowanie nie powiodło się.')
			})
	}

	return (
		<Navbar expand='lg' style={{ backgroundColor: '#eeeeee' }}>
			<Container>
				<Navbar.Brand as={Link} to='/'>
					Cars App
				</Navbar.Brand>
				<Navbar.Toggle aria-controls='basic-navbar-nav' />
				<Navbar.Collapse id='basic-navbar-nav'>
					<Nav className='me-auto'>
						<Nav.Link as={Link} to='/search'>
							Baza części
						</Nav.Link>
						<Nav.Link as={Link} to='/todos'>
							To do
						</Nav.Link>
					</Nav>
					<Nav>
						<Button onClick={handleLogout} btnText={'Wyloguj się'}></Button>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	)
}

export default Navigation
