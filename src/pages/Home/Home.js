import React, {Component} from 'react'
import Rubric from '../../components/UI/Rubric'
import classes from './Home.module.css'
import Card from '../../components/Card'
import Loader from '../../components/UI/Loader'

export default class Home extends Component {
	render() {
		const filter = this.props.homeFilter
		const data = this.props.data
		const {
			homeFilterStatus,
			onFilterChange,
			loading
		} = this.props
		return (
			<React.Fragment>
				<div className={classes.filter}>
					{filter.map(({name, label}) => {
						const isActive = homeFilterStatus === name
						const clazz = isActive ? true : false
						return (
							<Rubric
								key={name}
								clazz={clazz}
								title={label}
								name={name}
								onFilterChange={onFilterChange}
							/>
						)
					})}
				</div>
				{
					this.props.errorMessage
						? <h3
							style={{margin: '20px 0', color: 'red', textAlign: 'center'}}
						>В данный моммент сервера не доступны!</h3>
						: null
				}
				{
					loading
					? <div className={classes.loader}><Loader/></div>
					: <div className={classes.wrapperCard}>
							{data.map((item, index) => {
								return (
									<Card
										key={index}
										state={item}
									/>
								)
							})}
						</div>
				}
			</React.Fragment>
		)
	}

}