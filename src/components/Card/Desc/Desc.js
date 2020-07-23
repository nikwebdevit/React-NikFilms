import React from 'react'
import classes from './Desc.module.css'
import IconFA from '../../UI/IconFA'

const Desc = props => {
	const a = props.length
	const {
		titleRu,
		titleEn,
		rating,
		imdb,
		isWatch,
	} = props.state
	return (
		<React.Fragment>
			<div >
				<div
					className={classes.title}
					title={titleRu}
				>
					{titleRu.length > a
					? titleRu.slice(0, a) + '...'
					: titleRu}
					<span title='Рекомендую'>{isWatch
						? <IconFA faClass='far fa-check-circle' fontSize='14'/>
						: ''
					}</span>
				</div>
				<div className={classes.titleDesc} title={titleEn}>
					{titleEn.length > 25
						? titleEn.slice(0, 25) + '...'
						: titleEn}
				</div>
			</div>
			<div className={classes.year}>{props.year}</div>
			<div>
				<div className={classes.rating}>Рейтинг: {rating}</div>
				{imdb
				? <div className={classes.imdb}>IMDb: {imdb}</div>
				: ''}
			</div>
		</React.Fragment>
	)
}

export default Desc
