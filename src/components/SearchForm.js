import React from 'react'
import classes from './Button.module.css'

const SearchForm = ({ filters, setFilters, handleFilters, clearFilters }) => {
	const clearFilter = filterName => {
		setFilters(prevFilters => ({ ...prevFilters, [filterName]: '' }))
	}

	return (
		<div className='d-flex flex-wrap'>
			<div className='input-group mb-3'>
				<input
					type='text'
					className='form-control'
					placeholder='Nazwa'
					value={filters.name}
					onChange={e => setFilters({ ...filters, name: e.target.value })}
				/>
				{filters.name && (
					<button className='btn btn-outline-secondary' type='button' onClick={() => clearFilter('name')}>
						X
					</button>
				)}
			</div>
			<div className='input-group mb-3'>
				<select
					className='form-select'
					value={filters.category}
					onChange={e => setFilters({ ...filters, category: e.target.value })}>
					<option value='' defaultValue disabled>
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
				</select>
				{filters.category && (
					<button className='btn btn-outline-secondary' type='button' onClick={() => clearFilter('category')}>
						X
					</button>
				)}
			</div>
			<div className='input-group mb-3'>
				<select
					className='form-select'
					value={filters.mark}
					onChange={e => setFilters({ ...filters, mark: e.target.value })}>
					<option value='' defaultValue disabled>
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
					<option value='Seat'>Saab</option>
					<option value='Subaru'>Subaru</option>
					<option value='Suzuki'>Suzuki</option>
					<option value='Toyota'>Toyota</option>
					<option value='Volkswagen'>Volkswagen</option>
					<option value='Volvo'>Volvo</option>
					<option value='wszystkie'>Wszystkie</option>
				</select>
				{filters.mark && (
					<button className='btn btn-outline-secondary' type='button' onClick={() => clearFilter('mark')}>
						X
					</button>
				)}
			</div>
			<button className={`${classes.btn} me-3`} onClick={handleFilters}>
				Filtruj
			</button>
			<button className={classes.btnEdit} onClick={clearFilters}>
				Wyczyść filtry
			</button>
		</div>
	)
}

export default SearchForm
