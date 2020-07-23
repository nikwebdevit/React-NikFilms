import React from 'react'
import classes from './Input.module.css'

const Input = props => {
	return (
		<div className={classes.Input}>
			<input
				type={props.type ? props.type : 'text'}
				className={`${classes.inputField} + ${props.valid ? classes.inputTrue : null}`}
				id={`inputText${props.id}`}
				name={props.desc}
				value={props.value}
				onChange={e => props.onChangeInputValue(e, props.controlName)}
				placeholder="&nbsp;"
				autoComplete={props.autoComplete ? null : 'off'}
			/>
			<label htmlFor={`inputText${props.id}`} className={classes.inputLabel}>{props.label}</label>
		</div>
	)
}

export default Input