import React, { useState } from 'react'
import { Form, Card, Alert } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import Button from './Button'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'

const Login = () => {
	const [error, setError] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const navigate = useNavigate()

	const handleLogin = () => {
		const auth = getAuth()
		signInWithEmailAndPassword(auth, email, password)
			.then(userCredential => {
				const user = userCredential.user
				navigate('/')
			})
			.catch(error => {
				setError('Logowanie nie powiodło się.')
			})
	}

	return (
		<div className='d-flex align-items-center justify-content-center' style={{ minHeight: '100vh' }}>
			<Card style={{ minWidth: '300px', maxWidth: '400px', backgroundColor: '#eeeeee' }}>
				<Card.Body style={{ display: 'flex', flexDirection: 'column' }}>
					<h2 className='text-center mb-4'>Logowanie</h2>
					{error && <Alert variant='danger'>{error}</Alert>}
					<Form.Group>
						<Form.Label>Email</Form.Label>
						<Form.Control type='email' onChange={e => setEmail(e.target.value)} required />
					</Form.Group>
					<Form.Group>
						<Form.Label>Hasło</Form.Label>
						<Form.Control type='password' onChange={e => setPassword(e.target.value)} required />
					</Form.Group>
					<Button style={{ margin: '10px' }} onClick={handleLogin} btnText={'Zaloguj się'}></Button>
				</Card.Body>
			</Card>
		</div>
	)
}

export default Login
