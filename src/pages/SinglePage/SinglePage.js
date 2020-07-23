import React from 'react'
import classes from './SinglePage.module.css'
import YoutubePlayer from '../../components/UI/YoutubePlayer'

const SinglePage = (props) => {
	const [data] = props.data
	return (
		<div className={classes.SinglePage}>
			<div className={classes.wrapperInfo}>
				<div className={classes.img}>
					<img src={data.img} alt={data.titleEn}/>
				</div>
				<div className={classes.info}>
					<div className={classes.title}>
						{data.titleRu}
						<span className={classes.titleDesc}>{data.titleEn}</span>
					</div>
					<div>
						<span>Рейтинг</span>:<span className={classes.spanInfo}>{data.rating}</span>
						{
							data.imdb
							? <span className={classes.ratingDesc}>IMDb: {data.imdb}</span>
							: null
						}
					</div>
					<div><span>Год производства</span>:<span className={classes.spanInfo}>{data.year}</span></div>
					<div><span>Жанр</span>:<span className={classes.spanInfo}>{data.genre.join(', ')}</span></div>
					{
						data.producer
						? <div><span>Режиссер</span>:<span className={classes.spanInfo}>{data.producer}</span></div>
						: <div><span>Разработчик</span>:<span className={classes.spanInfo}>{data.developers}</span></div>
					}
					<div><span>Описание</span>:<span className={classes.spanInfo}>{data.desc}</span></div>
				</div>
			</div>
			<div className={classes.video}><YoutubePlayer src={data.trailer}/></div>
		</div>
	)
}

export default SinglePage