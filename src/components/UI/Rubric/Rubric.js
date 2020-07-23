import React from 'react'
import classes from './Rubric.module.css'

const Rubric = props => {
	const clazz = [
		classes.Rubric,
		props.clazz ? classes.active : ''
	]
	return (
		<div
			className={clazz.join(' ')}
			onClick={() => props.onFilterChange(props.name)}
		>{props.title}</div>
	)
}

export default Rubric