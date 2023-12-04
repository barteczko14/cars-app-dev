import React, { useState, useEffect } from 'react'
import { Row, Col, Form } from 'react-bootstrap'
import TableMain from './TableMain'
import SearchForm from './SearchForm'
import classes from './Button.module.css'
import { collection, addDoc, getDocs, doc, deleteDoc } from 'firebase/firestore'
import { db } from '../firebase'

const Search = () => {
	const [filters, setFilters] = useState({
		name: '',
		category: '',
		mark: '',
	})
	const [parts, setParts] = useState([])
	const [checked, setChecked] = useState([])

	const collectionRef = collection(db, 'parts')

	useEffect(() => {
		const getParts = async () => {
			const q = collectionRef
			await getDocs(q)
				.then(part => {
					let partData = part.docs.map(doc => ({
						...doc.data(),
						id: doc.id,
					}))
					setParts(partData)
					setChecked(partData)
				})
				.catch(err => {
					throw new Error('Error')
				})
		}
		getParts()
	}, [])

	const submitPart = async e => {
		e.preventDefault()

		if (!filters.name || !filters.mark || !filters.category) {
			alert('Wszystkie pola muszą być uzupełnione!')
			return
		}

		try {
			await addDoc(collectionRef, {
				name: filters.name,
				mark: filters.mark,
				category: filters.category,
			})
			window.location.reload()
		} catch (err) {
			throw new Error('Error')
		}
	}

	const deletePart = async id => {
		try {
			if (window.confirm('Czy na pewno chcesz usunąć to zadanie?')) {
				const documentRef = doc(db, 'parts', id)
				await deleteDoc(documentRef)
				window.location.reload()
			}
		} catch (err) {
			console.log(err)
		}
	}

	const handleFilter = async () => {
		let filteredParts = checked

		if (filters.name !== '') {
			filteredParts = filteredParts.filter(part => {
				return typeof part.name === 'string' && part.name.toLowerCase().includes(filters.name.toLowerCase())
			})
		}

		if (filters.category !== '') {
			filteredParts = filteredParts.filter(part => {
				return typeof part.category === 'string' && part.category.toLowerCase().includes(filters.category.toLowerCase())
			})
		}

		if (filters.mark !== '') {
			filteredParts = filteredParts.filter(part => {
				return typeof part.mark === 'string' && part.mark.toLowerCase().includes(filters.mark.toLowerCase())
			})
		}

		setParts(filteredParts)
	}

	const clearFilters = () => {
		setFilters({
			name: '',
			category: '',
			mark: '',
		})
		setParts(checked)
	}

	return (
		<div className='container'>
			<Row className='justify-content-md-center mt-4'>
				<Col>
					<button className={classes.btn} data-bs-toggle='modal' data-bs-target='#addModal'>
						Dodaj nową część
					</button>
				</Col>
			</Row>
			<Row className='mt-4'>
				<SearchForm
					filters={filters}
					setFilters={setFilters}
					handleFilters={handleFilter}
					clearFilters={clearFilters}
				/>
			</Row>
			<TableMain parts={parts} deletePart={deletePart}></TableMain>
			{/* Modal */}
			<div className='modal fade' id='addModal' aria-labelledby='addModalLabel' aria-hidden='true'>
				<div className='modal-dialog'>
					<form className='d-flex' onSubmit={submitPart}>
						<div className='modal-content'>
							<div className='modal-header'>
								<h5 className='modal-title' id='addModalLabel'>
									Dodaj nową część
								</h5>
								<button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
							</div>
							<div className='modal-body'>
								<Form.Control
									placeholder='Nazwa'
									type='text'
									className='mb-3'
									value={filters.name}
									onChange={e => setFilters({ ...filters, name: e.target.value })}
								/>

								<Form.Select
									value={filters.category}
									className='mb-3'
									onChange={e => setFilters({ ...filters, category: e.target.value })}>
									<option value='' defaultValue disabled='disabled'>
										Kategoria
									</option>
									<option value='Akumulatory'>Akumulatory</option>
									<option value='Alternatory'>Alternatory</option>
									<option value='Amortyzatory'>Amortyzatory</option>
									<option value='Błotniki'>Błotniki</option>
									<option value='Chłodnice'>Chłodnice</option>
									<option value='Elektronika'>Elektronika</option>
									<option value='Elementy drzwi'>Elementy drzwi</option>
									<option value='Felgi Aluminiowe'>Felgi aluminiowe</option>
									<option value='Felgi stalowe'>Felgi stalowe</option>
									<option value='Filtry'>Filtry</option>
									<option value='Halogeny'>Halogeny</option>
									<option value='Klapy'>Klapy</option>
									<option value='Kołpaki'>Kołpaki</option>
									<option value='Lampy'>Lampy</option>
									<option value='Listwy'>Listwy</option>
									<option value='Maski'>Maski</option>
									<option value='Oleje'>Oleje</option>
									<option value='Opony letnie'>Opony letnie</option>
									<option value='Opony wielosezonowe'>Opony wielosezonowe</option>
									<option value='Opony zimowe'>Opony zimowe</option>
									<option value='Pompy paliwa'>Pompy paliwa</option>
									<option value='Pompy wody'>Pompy wody</option>
									<option value='Rozruszniki'>Rozruszniki</option>
									<option value='Sprężyny'>Sprężyny</option>
									<option value='Świece zapłonowe'>Świece zapłonowe</option>
									<option value='Szyby'>Szyby</option>
									<option value='Tłumiki'>Tłumiki</option>
									<option value='Turbiny'>Turbiny</option>
									<option value='Turbosprężarki'>Turbosprężarki</option>
									<option value='Układ hamulcowy'>Układ hamulcowy</option>
									<option value='Układ napędowy'>Układ napędowy</option>
									<option value='Układ wydechowy'>Układ wydechowy</option>
									<option value='Zderzaki'>Zderzaki</option>
									<option value='inne'>Inne</option>
								</Form.Select>
								<Form.Select
									value={filters.mark}
									className='mb-3'
									onChange={e => setFilters({ ...filters, mark: e.target.value })}>
									<option value='' defaultValue disabled='disabled'>
										Marka
									</option>
									<option value='Alfa Romeo'>Alfa Romeo</option>
									<option value='Audi'>Audi</option>
									<option value='BMW'>BMW</option>
									<option value='Chevrolet'>Chevrolet</option>
									<option value='Chrysler'>Chrysler</option>
									<option value='Citroën'>Citroën</option>
									<option value='Fiat'>Fiat</option>
									<option value='Ford'>Ford</option>
									<option value='Honda'>Honda</option>
									<option value='Hyundai'>Hyundai</option>
									<option value='Infiniti'>Infiniti</option>
									<option value='Jaguar'>Jaguar</option>
									<option value='Jeep'>Jeep</option>
									<option value='Kia'>Kia</option>
									<option value='Land Rover'>Land Rover</option>
									<option value='Lexus'>Lexus</option>
									<option value='Mazda'>Mazda</option>
									<option value='Mercedes-Benz'>Mercedes-Benz</option>
									<option value='Mini'>Mini</option>
									<option value='Mitsubishi'>Mitsubishi</option>
									<option value='Nissan'>Nissan</option>
									<option value='Peugeot'>Peugeot</option>
									<option value='Renault'>Renault</option>
									<option value='Saab'>Saab</option>
									<option value='Seat'>Seat</option>
									<option value='Subaru'>Subaru</option>
									<option value='Suzuki'>Suzuki</option>
									<option value='Toyota'>Toyota</option>
									<option value='Volkswagen'>Volkswagen</option>
									<option value='Volvo'>Volvo</option>
									<option value='wszystkie'>Wszystkie</option>
								</Form.Select>
							</div>
							<div className='modal-footer'>
								<button type='button' className={classes.btnBack} data-bs-dismiss='modal'>
									Zamknij
								</button>
								<button type='submit' className={classes.btnEdit}>
									Dodaj
								</button>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	)
}

export default Search
