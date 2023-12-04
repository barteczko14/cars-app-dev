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

export default function Todos() {
	const [todos, setTodos] = useState([])
	const [createTodo, setCreateTodo] = useState('')
	const [checked, setChecked] = useState([])

	const collectionRef = collection(db, 'todo')

	useEffect(() => {
		const getTodos = async () => {
			const q = query(collectionRef, orderBy('timestamp'))
			await getDocs(q).then(todo => {
				let todoData = todo.docs.map(doc => ({
					...doc.data(),
					id: doc.id,
				}))
				setTodos(todoData)
				setChecked(todoData)
			})
		}
		getTodos()
	}, [])

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
			throw new Error('Error')
		}
	}

	const deleteTodo = async id => {
		try {
			if (window.confirm('Czy na pewno chcesz usunąć to zadanie?')) {
				const documentRef = doc(db, 'todo', id)
				await deleteDoc(documentRef)
				window.location.reload()
			}
		} catch (err) {
			throw new Error('Error')
		}
	}

	const checkHandler = async event => {
		setChecked(state => {
			const indexToUpdate = state.findIndex(checkBox => checkBox.id.toString() === event.target.name)
			let newState = state.slice()
			newState.splice(indexToUpdate, 1, {
				...state[indexToUpdate],
				isChecked: !state[indexToUpdate].isChecked,
			})
			setTodos(newState)
			return newState
		})

		try {
			const docRef = doc(db, 'todo', event.target.name)
			await runTransaction(db, async transaction => {
				const todoDoc = await transaction.get(docRef)
				if (!todoDoc.exists()) {
					throw new Error('Error')
				}
				const newValue = !todoDoc.data().isChecked
				transaction.update(docRef, { isChecked: newValue })
			})
		} catch (error) {
			throw new Error('Error')
		}
	}

	return (
		<>
			<div className='container mt-3'>
				<div className='card'>
					<div className='card-body'>
						<button className={classes.btn} data-bs-toggle='modal' data-bs-target='#addModal'>
							Dodaj zadanie
						</button>
						{todos.map(({ todo, id, isChecked, timestamp }) => (
							<div key={id}>
								<Todo
									id={id}
									timestamp={timestamp}
									todo={todo}
									isChecked={isChecked}
									deleteTodo={deleteTodo}
									checkHandler={checkHandler}></Todo>
							</div>
						))}
					</div>
				</div>
			</div>
			{/* Modal */}
			<div className='modal fade' id='addModal' aria-labelledby='addModalLabel' aria-hidden='true'>
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
