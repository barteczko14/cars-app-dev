import classes from './Button.module.css'
import EditTodo from './EditTodo'
const Todo = ({ id, timestamp, todo, isChecked, deleteTodo, checkHandler }) => {
	return (
		<div className='p-2 my-2 fs-6'>
			<hr />
			<span className={`${isChecked === true ? 'done' : ''}`}>
				<div className='checker'>
					<span>
						<input type='checkbox' defaultChecked={isChecked} name={id} onChange={event => checkHandler(event)} />
					</span>
				</div>
				<span>{todo}</span>
				<br />
				<i>{new Date(timestamp.seconds * 1000).toLocaleString()}</i>
			</span>
			<div>
				<button type='button' className={`${classes.btnDelete} float-end`} onClick={() => deleteTodo(id)}>
					Usuń
				</button>
				<span className=' float-end mx-3'>
					<EditTodo todo={todo} id={id} />
				</span>
			</div>
		</div>
	)
}
export default Todo
