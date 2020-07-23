import React from 'react'
import classes from './Card.module.css'
import Desc from './Desc'
import {NavLink} from 'react-router-dom'

const Card = props => {

	const {
		titleRu,
		isWatch,
		img,
		rub,
		titleEn
	} = props.state
	return (
		<NavLink to={`/${rub}/${titleEn.split(' ').join('-')}`}>
			<div
				className={classes.Card}
			>
				<img
					src={img}
					alt={titleRu}
				/>
				<div>
					<Desc
						length='18'
						state={props.state}
						isWatch={isWatch}
					/>
				</div>
			</div>
		</NavLink>
	)
}

export default Card