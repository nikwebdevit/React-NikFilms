import React from 'react'
import classes from './Checkbox.module.css'

const Checkbox = props => {
	return (
		<div className={classes.Checkbox}>
			<input
				type='checkbox'
				className={classes.checkboxField}
				id={`inputCheckbox${props.id}`}
				name={props.desc}
				checked={props.value}
				onChange={e => props.onChangeCheckboxValue(e, props.controlName)}
			/>
			<label htmlFor={`inputCheckbox${props.id}`} className={classes.checkboxLabel}>{props.label}</label>
		</div>
	)
}

export default Checkbox