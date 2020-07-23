import React from 'react'
import classes from './Select.module.css'

const Select = props => {
	const {desc, select} = props.select
	return (
		<div className={classes.Select}>
			<label htmlFor={desc}>Рубрика:</label>
			<select name={desc} defaultValue={props.genre} onChange={(e) => props.onChangeGenre(e.target.value)}>
				{select.map(e => {
					return(
						<option key={e.value} value={e.value}>{e.label}</option>
					)
				})}
			</select>
		</div>
	)
}

export default Select