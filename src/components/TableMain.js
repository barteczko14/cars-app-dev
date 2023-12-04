import React from 'react'
import Table from 'react-bootstrap/Table'
import btnClasses from './Button.module.css'

const TableMain = ({ parts, deletePart }) => {
	return (
		<Table responsive size='sm' bordered hover className='my-3'>
			<thead>
				<tr className='text-center'>
					<th className='col-4'>Nazwa</th>
					<th className='col-2'>Kategoria</th>
					<th className='col-1'>Marka</th>
					<th className='col-1'></th>
				</tr>
			</thead>
			<tbody>
				{parts.map(part => (
					<tr className='text-center' key={part.id}>
						<td>{part.name}</td>
						<td>{part.category}</td>
						<td>{part.mark}</td>
						<td>
							<button onClick={() => deletePart(part.id)} className={`${btnClasses.btnDelete} mx-2 my-1`}>
								Usuń
							</button>
						</td>
					</tr>
				))}
			</tbody>
		</Table>
	)
}

export default TableMain
