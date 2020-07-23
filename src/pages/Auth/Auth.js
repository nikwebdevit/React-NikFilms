import React, {Component} from 'react'
import classes from './Auth.module.css'
import PageTitle from '../../components/UI/PageTitle'
import Input from '../../components/UI/Input'
import is from 'is_js'
import axios from 'axios'

export default class Auth extends Component {
	state = {
		isFormValid: false,
		formControls: {
			email: {
				value: '',
				type: 'text',
				label: 'Email',
				autocomplete: true,
				errorMessage: 'Введите корректный email',
				valid: false,
				touched: false,
				validation: {
					required: true,
					email: true
				}
			},
			password: {
				value: '',
				type: 'password',
				label: 'Пароль',
				errorMessage: 'Введите корректный пароль',
				valid: false,
				touched: false,
				validation: {
					required: true,
					minLength: 6
				}
			}
		},
		login: false,
		touched: false,
	}

	renderInputs() {
		return Object.keys(this.state.formControls).map((controlName, index) => {
			const control = this.state.formControls[controlName]
			return (
				<Input
					key={controlName + index}
					id={control.type}
					type={control.type}
					value={control.value}
					valid={control.valid}
					autoComplete={control.autocomplete}
					touched={control.touched}
					label={control.label}
					shouldValidate={!!control.validation}
					errorMessage={control.errorMessage}
					controlName={controlName}
					onChangeInputValue={e => this.onChangeHandler(e, controlName)}
				/>
			)
		})
	}

	onChangeHandler = (e, controlName) => {
		const formControls = {...this.state.formControls}
		const control = {...formControls[controlName]}

		control.value = e.target.value
		control.touched = true
		control.valid = this.validateControl(control.value, control.validation)

		formControls[controlName] = control

		let isFormValid = true

		Object.keys(formControls).forEach(name => {
			isFormValid = formControls[name].valid && isFormValid
		})

		this.setState({
			formControls, isFormValid
		})
	}

	validateControl(value, validation) {
		if (!validation) {
			return true
		}

		let isValid = true

		if (validation.required) {
			isValid = value.trim() !== '' && isValid
		}

		if (validation.email) {
			isValid = is.email(value) && isValid
		}

		if (validation.minLength) {
			isValid = value.length >= validation.minLength && isValid
		}

		return isValid
	}

	submitHandler = (e) =>{
		e.preventDefault()
	}

	loginHandler = async () => {
		const authData = {
			email: this.state.formControls.email.value,
			password: this.state.formControls.password.value,
			returnSecureToken: true
		}
		try {
			const res = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAZ02nksOO6eqbG0f7hrlDtMMX0b2DkIS8', authData)
			this.setState({touched: true, login: true})
			this.props.onChangeAuth(res.data.idToken)
		} catch (e) {
			this.setState({touched: true, login: false})
		}
	}

	render() {
		return (
			<div className={classes.Auth}>
				<PageTitle clazz='true' title='Авторизация'/>
				<form onSubmit={this.submitHandler}>
					{this.renderInputs()}

					<button
						className={classes.buttonLogin}
						onClick={this.loginHandler}
						disabled={!this.state.isFormValid}
					>
						Войти
					</button>
					{
						this.state.touched
						? <div
								style={{
									textAlign: 'center',
									color: 'red',
									fontWeight: 'bold'
								}}>Вход не удался, повторите попытку!
							</div>
						: null
					}
				</form>
			</div>
		)
	}

}