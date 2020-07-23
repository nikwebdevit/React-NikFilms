import React from 'react'
import classes from './PageTitle.module.css'

const PageTitle = props => {
	const clazz = [
		classes.PageTitle,
		props.clazz ? classes.active : ''
	]
	return (
		<div className={clazz.join(' ')}>{props.title}</div>
	)
}

export default PageTitle