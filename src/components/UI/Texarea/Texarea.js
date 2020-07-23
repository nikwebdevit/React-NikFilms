import React from 'react'
import classes from './Texarea.module.css'

const Texarea = props => {
	return (
		<div className={classes.Texarea}>
			<textarea
				name={props.desc}
				placeholder={props.label}
				value={props.value}
				required
				onChange={e => props.onChangeTextareaValue(e, props.controlName)}
			/>
		</div>
	)
}

export default Texarea