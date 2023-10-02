import Todo from './Todo'
import React, { useState, useEffect } from 'react'
import classes from './Button.module.css'
import {
	collection,
	addDoc,
	serverTimestamp,
	getDocs,
	doc,
	deleteDoc,
	runTransaction,
	orderBy,
	query,
} from 'firebase/firestore'

import { db } from '../firebase'

export default function Todos(props) {
	const [createTodo, setCreateTodo] = useState('')
	const [todos, setTodo] = useState([])

	const [checked, setChecked] = useState([])

	const collectionRef = collection(db, 'todo')

	useEffect(() => {
		const getTodo = async () => {
			const q = query(collectionRef, orderBy('timestamp'))
			await getDocs(q)
				.then(todo => {
					let todoData = todo.docs.map(doc => ({
						...doc.data(),
						id: doc.id,
					}))
					setTodo(todoData)
					setChecked(todoData)
				})
				.catch(err => {
					console.log(err)
				})
		}
		getTodo()
	}, [])

	//Add Todo Handler
	const submitTodo = async e => {
		e.preventDefault()

		if (!createTodo) {
			alert('Wszystkie pola muszą być uzupełnione!')
			return
		}

		try {
			await addDoc(collectionRef, {
				todo: createTodo,
				isChecked: false,
				timestamp: serverTimestamp(),
			})
			window.location.reload()
		} catch (err) {
			console.log(err)
		}
	}

	//Delete Handler
	const deleteTodo = async id => {
		try {
			if (window.confirm('Czy na pewno chcesz usunąć to zadanie?')) {
				const documentRef = doc(db, 'todo', id)
				await deleteDoc(documentRef)
				window.location.reload()
			}
		} catch (err) {
			console.log(err)
		}
	}

	//Checkbox Handler
	const checkHandler = async (event, todo) => {
		setChecked(state => {
			const indexToUpdate = state.findIndex(checkBox => checkBox.id.toString() === event.target.name)
			let newState = state.slice()
			newState.splice(indexToUpdate, 1, {
				...state[indexToUpdate],
				isChecked: !state[indexToUpdate].isChecked,
			})
			setTodo(newState)
			return newState
		})

		// Persisting the checked value
		try {
			const docRef = doc(db, 'todo', event.target.name)
			await runTransaction(db, async transaction => {
				const todoDoc = await transaction.get(docRef)
				if (!todoDoc.exists()) {
					throw 'Dokument nie istnieje!'
				}
				const newValue = !todoDoc.data().isChecked
				transaction.update(docRef, { isChecked: newValue })
			})
		} catch (error) {
			console.log('Transaction failed: ', error)
		}
	}

	return (
		<>
			<div className='container' style={{ marginTop: '20px' }}>
				<div className='row'>
					<div className='col-md-12'>
						<div className='card card-white'>
							<div className='card-body'>
								<button className={classes.btn} data-bs-toggle='modal' data-bs-target='#addModal'>
									Dodaj zadanie
								</button>

								{todos.map(({ todo, id, isChecked, timestamp }) => (
									<div className='todo-list' key={id}>
										{
											<Todo
												id={id}
												timestamp={timestamp}
												todo={todo}
												isChecked={isChecked}
												deleteTodo={deleteTodo}
												checkHandler={checkHandler}></Todo>
										}
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Modal */}
			<div className='modal fade' id='addModal' tabIndex='-1' aria-labelledby='addModalLabel' aria-hidden='true'>
				<div className='modal-dialog'>
					<form className='d-flex' onSubmit={submitTodo}>
						<div className='modal-content'>
							<div className='modal-header'>
								<h5 className='modal-title' id='addModalLabel'>
									Dodaj zadanie
								</h5>
								<button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
							</div>
							<div className='modal-body'>
								<input
									type='text'
									className='form-control'
									placeholder='Dodaj zadanie'
									onChange={e => setCreateTodo(e.target.value)}
								/>
							</div>
							<div className='modal-footer'>
								<button type='button' className={classes.btnBack} data-bs-dismiss='modal'>
									Zamknij
								</button>
								<button className={classes.btnEdit}>Dodaj</button>
							</div>
						</div>
					</form>
				</div>
			</div>
		</>
	)
}
