import React, {Component} from 'react'
import classes from './Nav.module.css'
import IconFA from '../UI/IconFA'
import {NavLink} from 'react-router-dom'

export default class Nav extends Component {
	render() {
		const menu = this.props.menu
		return (
			<nav className={classes.Nav}>
				<ul>
					{menu.map((item) => {
						return (
							<li key={item.title} title={item.title}>
								<NavLink
									to={item.to}
									exact={item.exact}
									activeClassName={classes.active}
									onClick={() => this.props.openMenu(!this.props.isOpenMenu)}
								>
									<IconFA faClass={item.icon} fontSize='18'/>
									<span className={classes.navMob}>{item.title}</span>
								</NavLink>
							</li>
						)
					})}
				</ul>
			</nav>
		)
	}
}