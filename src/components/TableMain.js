import React from 'react'
import Table from 'react-bootstrap/Table'
import btnClasses from './Button.module.css'

const TableMain = props => {
	return (
		<>
			<Table responsive bordered hover style={{ marginTop: '20px' }}>
				<thead>
					<tr className='text-center'>
						<th style={{ maxWidth: '100px' }}>Nazwa</th>
						<th className='col-2'>Kategoria</th>
						<th className='col-1'>Marka</th>
						<th className='col-1'></th>
					</tr>
				</thead>
				<tbody>
					{props.parts.map(part => (
						<tr className='text-center' key={part.id}>
							<td style={{ maxWidth: '100px', wordWrap: 'break-word' }}>{part.name}</td>
							<td>{part.category}</td>
							<td>{part.mark}</td>
							<td className='text-center'>
								<button onClick={() => props.deletePart(part.id)} className={`${btnClasses.btnDelete} mx-2 my-1`}>
									Usuń
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</Table>
		</>
	)
}

export default TableMain
