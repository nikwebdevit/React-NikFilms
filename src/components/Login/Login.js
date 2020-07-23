import React, {Component} from 'react'
import IconFA from '../UI/IconFA'
import classes from './Login.module.css'
import {NavLink} from 'react-router-dom'

export default class Login extends Component {
	render() {
		const auth = []
		if (this.props.auth) {
			auth.push({icon: 'fas fa-times', title: 'Выйти', to: '/logout'})
		} else {
			auth.push({icon: 'fas fa-sign-in-alt', title: 'Вход', to: '/auth'})
		}
		return (
			<div className={classes.Login}>
				<NavLink
					to={auth[0].to}
					onClick={() => {
						this.props.openMenu(!this.props.isOpenMenu)
						if (this.props.auth) {
							this.props.onResetAuth()
						}
					}}
				>
					<IconFA title={auth[0].title} faClass={auth[0].icon} fontSize='18'/>
				</NavLink>
			</div>
		)
	}
}