import React from 'react'

const Handbook = ({ repairGuides }) => {
	return (
		<div className='container mt-5'>
			<div className='list-group'>
				{repairGuides.map((guide, index) => (
					<div key={index} className='list-group-item my-3'>
						<h5 className='text-center mb-3'>{guide.title}</h5>
                        <hr/>
						<ul>
							{guide.content.map((point, pointIndex) => (
								<li key={pointIndex}>{point}</li>
							))}
						</ul>
					</div>
				))}
			</div>
		</div>
	)
}

export default Handbook
