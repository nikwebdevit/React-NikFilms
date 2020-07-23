import React from 'react'
import classes from './CheckboxGenre.module.css'

const CheckboxGenre = props => {
	return (
		<div className={classes.CheckboxGenre}>
			<input
				type='checkbox'
				className={classes.checkboxGenreField}
				id={`inputCheckboxGenre${props.id}`}
				name='genre'
				checked={props.value ? true : false}
				onChange={e => props.onChangeCheckboxGenreValue(e, props.controlName, props.rdn)}
			/>
			<label htmlFor={`inputCheckboxGenre${props.id}`} className={classes.checkboxGenreLabel}>{props.label}</label>
		</div>
	)
}

export default CheckboxGenre