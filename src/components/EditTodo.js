import React, { useState } from 'react'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../firebase'
import classes from './Button.module.css'

const EditTodo = ({ todo, id }) => {
	const [editedTodo, setEditedTodo] = useState([todo])

	const updateTodo = async e => {
		try {
			const todoDocument = doc(db, 'todo', id)
			await updateDoc(todoDocument, {
				todo: editedTodo,
			})
			window.location.reload()
		} catch (err) {
			console.log(err)
		}
	}

	return (
		<>
			<button className={classes.btnEdit} data-bs-toggle='modal' data-bs-target={`#id${id}`}>
				Edycja
			</button>
			<div className='modal fade' id={`id${id}`} aria-labelledby='editLabel' aria-hidden='true'>
				<div className='modal-dialog'>
					<div className='modal-content'>
						<div className='modal-header'>
							<h5 className='modal-title' id='editLabel'>
								Edycja zadania
							</h5>
							<button className='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
						</div>
						<div className='modal-body'>
							<form className='d-flex'>
								<input
									type='text'
									className='form-control'
									defaultValue={todo}
									onChange={e => setEditedTodo(e.target.value)}
								/>
							</form>
						</div>
						<div className='modal-footer'>
							<button type='button' className={classes.btnBack} data-bs-dismiss='modal'>
								Zamknij
							</button>
							<button type='button' className={classes.btnEdit} onClick={e => updateTodo(e)}>
								Edytuj
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default EditTodo
