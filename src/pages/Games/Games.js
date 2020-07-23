import React, {Component} from 'react'
import classes from '../Films/Films.module.css'
import Desc from '../../components/Card/Desc'
import {NavLink} from 'react-router-dom'
import PageTitle from '../../components/UI/PageTitle'
import Loader from '../../components/UI/Loader'

export default class Games extends Component {

	render() {
		const data = this.props.data
		return (
			<React.Fragment>
				<div className={classes.filter}>
					<PageTitle
						clazz='true'
						title='Рейтинг игр'
					/>
				</div>
				{
					this.props.loading
					? <div className={classes.loader}><Loader/></div>
					: <div className={classes.wrapperCard}>
							<ul>
								{data.map((item, index) => {
									return (
										<NavLink
											key={index}
											to={`/games/${item.titleEn.split(' ').join('-')}`}
										>
											<li>
												<span><span>{index + 1}</span></span>
												<Desc
													state={item}
												/>
											</li>
										</NavLink>
									)
								})}
							</ul>
						</div>
				}
			</React.Fragment>
		)
	}

}