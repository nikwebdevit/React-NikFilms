import React from 'react'
import classes from './Button.module.css'

const Button = props => {
	const isOpen = props.openGenre ? () => props.openGenre(!props.isOpenGenre) : null
	return (
		<button
			type={props.type}
			onClick={isOpen}
			className={classes.Button}
			disabled={props.disabled}
			style={props.style === 'submit' ? null : {backgroundColor : 'lightslategrey'}}
		>
			{props.label}
		</button>
	)
}

export default Button