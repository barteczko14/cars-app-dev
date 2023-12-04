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
				navigate('/')
			})
			.catch(error => {
				setError('Logowanie nie powiodło się.')
			})
	}

	return (
		<div className='d-flex align-items-center justify-content-center min-vh-100'>
			<Card className='card'>
				<Card.Body className='d-flex flex-column'>
					<h2 className='text-center mb-4'>Logowanie</h2>
					{error && <Alert variant='danger'>{error}</Alert>}
					<Form.Group>
						<Form.Label>Email</Form.Label>
						<Form.Control type='email' onChange={e => setEmail(e.target.value)} required />
					</Form.Group>
					<Form.Group className='my-3'>
						<Form.Label>Hasło</Form.Label>
						<Form.Control type='password' onChange={e => setPassword(e.target.value)} required />
					</Form.Group>
					<Button onClick={handleLogin} btnText={'Zaloguj się'}></Button>
				</Card.Body>
			</Card>
		</div>
	)
}

export default Login
