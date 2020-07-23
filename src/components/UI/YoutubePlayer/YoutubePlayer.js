import React from 'react'
import classes from './YoutubePlayer.module.css'

const YoutubePlayer = props => {
	return (
		<iframe
			title={props.src}
			className={classes.YoutubePlayer}
			src={`https://www.youtube.com/embed/${props.src}?rel=0&showinfo=0`}
			frameBorder="0"
			allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
			allowFullScreen
		/>
	)
}

export default YoutubePlayer