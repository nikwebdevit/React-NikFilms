import React, {Component} from 'react'
import classes from './Add.module.css'
import Input from '../../components/UI/Input'
import Checkbox from '../../components/UI/Checkbox'
import Button from '../../components/UI/Button'
import Texarea from '../../components/UI/Texarea'
import PageTitle from '../../components/UI/PageTitle'
import Select from '../../components/UI/Select'
import CheckboxGenre from '../../components/UI/CheckboxGenre'
import IconFA from '../../components/UI/IconFA'
import axios from 'axios'
import Loader from '../../components/UI/Loader'
import {Redirect, Switch} from 'react-router-dom'
import Error from '../Error'

export default class Add extends Component {
	state={
		loading: true,
		input: {
			titleRu: {
				id: 1,
				desc: 'titleRu',
				label: 'Название:',
				value: ''
			},
			titleEn: {
				id: 2,
				desc: 'titleEn',
				label: 'Оригинальное название:',
				value: ''
			},
			year: {
				id: 3,
				desc: 'year',
				label: 'Год выпуска:',
				value: ''
			},
			rating: {
				id: 4,
				desc: 'rating',
				label: 'Рейтинг:',
				value: ''
			},
			imdb: {
				id: 5,
				desc: 'imdb',
				label: 'IMDb:',
				value: ''
			},
			producer: {
				id: 6,
				desc: 'producer',
				label: 'Режиссёр / Разработчик:',
				value: ''
			},
			img: {
				id: 7,
				desc: 'img',
				label: 'Ссылка на изображение:',
				value: ''
			},
			trailer: {
				id: 8,
				desc: 'trailer',
				label: 'Трейлер:',
				value: ''
			},
		},
		checkbox: {
			isWatch: {
				id: 1,
				desc: 'isWatch',
				label: 'Обязательно посмотреть:',
				value: false
			}
		},
		textarea: {
			desc: {
				desc: 'desc',
				label: 'Описание',
				value: ''
			},
		},
		submitBtn: {
				type: 'submit',
				style: 'submit',
				label: 'Опубликовать'
		},
		openBtn: {
				type: 'button',
				style: 'button1',
				label: 'Выбрать жанр'
		},
		isOpenGenre: false,
		genre: 'films',
		rub: {
			desc: 'rub',
			select: [
				{
					value: 'films',
					label: 'Фильм'
				},
				{
					value: 'ser',
					label: 'Сериал'
				},
				{
					value: 'game',
					label: 'Игра'
				},
			]
		},
		genreFilmsSer: [],
		genreGames: [],
		inputAddGenre: {
			id: 1,
			desc: 'add',
			label: 'Добавить новую категорию:',
			value: ''
		},
		inputSearchGenre: {
			id: 1,
			desc: 'search',
			label: 'Поиск:',
			value: ''
		}
	}

	genreRender(filter) {
		const genreListFS = this.searchItems(this.state.genreFilmsSer, this.state.inputSearchGenre.value)
		const genreListG = this.searchItems(this.state.genreGames, this.state.inputSearchGenre.value)
		switch (filter) {
			case 'films':
			case 'ser':
				return genreListFS.map((e, i) => <CheckboxGenre
					key={i+1}
					id={e.label}
					label={e.label}
					value={e.value}
					controlName={e.label}
					rdn='films'
					onChangeCheckboxGenreValue={this.onChangeCheckboxGenreValue}
				/>)
			case 'game':
				return genreListG.map((e, i) => <CheckboxGenre
					key={i+1}
					id={e.label}
					label={e.label}
					value={e.value}
					controlName={e.label}
					rdn='game'
					onChangeCheckboxGenreValue={this.onChangeCheckboxGenreValue}
				/>)
			default:
				return
		}
	}

	renderInputs() {
		return Object.keys(this.state.input).map((controlName, index) => {
			const control = this.state.input[controlName]
			return (
				<Input
					key={index+1}
					id={index+1}
					desc={control.desc}
					label={control.label}
					value={control.value}
					controlName={controlName}
					onChangeInputValue={this.onChangeInputValue}
				/>
			)
		})
	}

	renderCheckbox() {
		return Object.keys(this.state.checkbox).map((controlName, index) => {
			const control = this.state.checkbox[controlName]
			return (
				<Checkbox
					key={index+1}
					id={index+1}
					desc={control.desc}
					label={control.label}
					value={control.value}
					controlName={controlName}
					onChangeCheckboxValue={this.onChangeCheckboxValue}
				/>
			)
		})
	}

	renderTextarea() {
		return Object.keys(this.state.textarea).map((controlName, index) => {
			const control = this.state.textarea[controlName]
			return (
				<Texarea
					key={index+1}
					id={index+1}
					desc={control.desc}
					label={control.label}
					value={control.value}
					controlName={controlName}
					onChangeTextareaValue={this.onChangeTextareaValue}
				/>
			)
		})
	}

	onChangeInputValue = (e, controlName) => {
		const input = {...this.state.input}
		const control = {...input[controlName]}

		control.value = e.target.value

		input[controlName] = control

		this.setState({input})
	}

	onChangeCheckboxValue = (e, controlName) => {
		const checkbox = {...this.state.checkbox}
		const control = {...checkbox[controlName]}

		control.value = e.target.checked

		checkbox[controlName] = control

		this.setState({checkbox})
	}

	onChangeTextareaValue = (e, controlName) => {
		const textarea = {...this.state.textarea}
		const control = {...textarea[controlName]}

		control.value = e.target.value

		textarea[controlName] = control

		this.setState({textarea})
	}

	onChangeCheckboxGenreValue = (e, controlName, rdn) => {
		if (rdn === 'films') {
			const genreFilmsSer = this.state.genreFilmsSer
			const idx = this.state.genreFilmsSer.findIndex((item) => item.label === controlName)
			const control = genreFilmsSer[idx]
			control.value = e.target.checked
			this.setState({genreFilmsSer})

		} else if (rdn === 'game'){
			const genreGames = this.state.genreGames
			const idx = this.state.genreGames.findIndex((item) => item.label === controlName)
			const control = genreGames[idx]
			control.value = e.target.checked
			this.setState({genreGames})
		}
	}

	onChangeGenre = (genre) => {
		this.setState({genre})
	}
	openGenre = (isOpenGenre) => {
		this.setState({isOpenGenre})
	}

	onChangeAddGenre = e => {
		const inputAddGenre = {...this.state.inputAddGenre}

		inputAddGenre.value = e.target.value

		this.setState({inputAddGenre})
	}

	submitHandler = event => {
		event.preventDefault()
		const {titleRu, titleEn, year, rating, imdb, producer, trailer, img} = this.state.input
		const {isWatch} = this.state.checkbox
		const genre = this.state.genre
		const {desc} = this.state.textarea
		const genreFilmsSer = this.state.genreFilmsSer
		const genreGames = this.state.genreGames

		if (genre === 'films' || genre === 'ser') {
			const filmSerObj = {
				date: new Date(),
				titleRu: titleRu.value,
				titleEn: titleEn.value,
				year: year.value,
				rating: rating.value,
				imdb: imdb.value,
				img: img.value,
				isWatch: isWatch.value,
				rub: genre,
				genre: genreFilmsSer.filter(e => e.value === true).map(e => e.label),
				producer: producer.value,
				trailer: trailer.value,
				desc: desc.value
			}
			this.props.addNewPost(filmSerObj, genre)
		} else {
			const gameObj = {
				date: new Date(),
				titleRu: titleRu.value,
				titleEn: titleEn.value,
				year: year.value,
				rating: rating.value,
				developers: producer.value,
				rub: genre.value,
				genre: genreGames.filter(e => e.value === true).map(e => e.label),
				isWatch: isWatch.value,
				img: img.value,
				trailer: trailer.value,
				desc: desc.value
			}
			this.props.addNewPost(gameObj, genre)
		}
		this.resetForm()
	}

	resetForm = () => {
		const input = {...this.state.input}
		const checkbox = {...this.state.checkbox}
		const textarea = {...this.state.textarea}
		const genreFilmsSer = {...this.state.genreFilmsSer}
		return (
			Object.keys(this.state.input).map((controlName) => {
				const control = {...input[controlName]}
				control.value = ''
				input[controlName] = control
				this.setState({input})
			}),

			Object.keys(this.state.checkbox).map((controlName) => {
				const control = {...checkbox[controlName]}
				control.value = false
				checkbox[controlName] = control
				this.setState({checkbox})
			}),
			Object.keys(this.state.textarea).map((controlName) => {
				const control = {...textarea[controlName]}
				control.value = ''
				textarea[controlName] = control
				this.setState({textarea})
			}),
			this.setState({
				isOpenGenre: false,
			})
		)
	}

	onAddGenre = async() => {
		const inputAddGenre = {...this.state.inputAddGenre}
		const auth = this.props.token
		if (inputAddGenre.value.length === 0) {
			alert('Введите жанр')
		} else {
			if (this.state.genre === 'films' || this.state.genre === 'ser') {
				const objFilm = {label: inputAddGenre.value}
				await axios.post(`https://nikfilms-f53a1.firebaseio.com/genreFilmsSer.json?auth=${auth}`, objFilm)
				const genreFilmsSer = [...this.state.genreFilmsSer, objFilm]
				this.setState({genreFilmsSer})
			} else {
				const objFilm = {label: inputAddGenre.value}
				await axios.post(`https://nikfilms-f53a1.firebaseio.com/genreGames.json?auth=${auth}`, objFilm)
				const genreGames = [...this.state.genreGames, objFilm]
				this.setState({genreGames})
			}
			inputAddGenre.value = ''
			this.setState({inputAddGenre})
		}
	}

	onChangeSearchGenre = e => {
		const inputSearchGenre = {...this.state.inputSearchGenre}
		inputSearchGenre.value = e.target.value
		this.setState({inputSearchGenre})
	}

	searchItems(items, search) {
		if (search.length === 0) {
			return items;
		}
		return items.filter((item) => {
			return item.label.toLowerCase().indexOf(search.toLowerCase()) > -1;
		});
	}

	async componentDidMount() {
		try {
			const res1 = await axios.get('https://nikfilms-f53a1.firebaseio.com/genreFilmsSer.json')
			const res2 = await axios.get('https://nikfilms-f53a1.firebaseio.com/genreGames.json')
			const genreFilmsSer = []
			const genreGames = []

			if (res1.data !== null) {
				Object.values(res1.data).forEach((key, index) => {
					genreFilmsSer.push(key)
				})
			}
			if (res2.data !== null) {
				Object.values(res2.data).forEach((key, index) => {
					genreGames.push(key)
				})
			}

			this.setState({genreFilmsSer, genreGames, loading: false})
		} catch (e) {
			this.props.onChangeErrorMsg()
		}
	}

	render() {
		const {submitBtn, rub, openBtn, genre, isOpenGenre, loading, inputSearchGenre, inputAddGenre} = this.state

		return (
			<div className={classes.Add}>
				<PageTitle clazz='true' title='Добавить'/>
				<form onSubmit={this.submitHandler}>
					{
						this.props.errorMessage
						? <h3
							style={{margin: '20px 0', color: 'red'}}
							>В данный моммент сервера не доступны и публикация новой карточки невозможна!</h3>
						: null
					}
					<Select select={rub} genre={genre} onChangeGenre={this.onChangeGenre}/>

					{this.renderInputs()}
					{this.renderCheckbox()}

					<div>
						<Button type={openBtn.type} style={openBtn.style} label={openBtn.label} openGenre={this.openGenre} isOpenGenre={isOpenGenre}/>
						{
							loading
							? <div style={isOpenGenre ? {display: 'flex'} : {display: 'none'}} className={classes.loader}><Loader/></div>
							: <div style={isOpenGenre ? {display: 'flex'} : {display: 'none'}} className={classes.isOpenGenre}>
								<Input
									desc={inputSearchGenre.desc}
									label={inputSearchGenre.label}
									value={inputSearchGenre.value}
									autoComplete={inputSearchGenre.autocomplete}
									onChangeInputValue={this.onChangeSearchGenre}
								/>
								<div className={classes.genreRender}>
									{this.genreRender(genre)}
								</div>
								<div>
									<Input
										desc={inputAddGenre.desc}
										label={inputAddGenre.label}
										value={inputAddGenre.value}
										onChangeInputValue={this.onChangeAddGenre}
									/>
									<button
										type='button'
										className={classes.addButton}
										onClick={this.onAddGenre}
									>
										<IconFA faClass='fas fa-plus' fontSize='22'/>
									</button>
								</div>
							</div>
						}
					</div>

					{this.renderTextarea()}

					<div className={classes.btn}>
						<Button disabled={this.props.errorMessage} type={submitBtn.type} style={submitBtn.style} label={submitBtn.label}/>
					</div>
				</form>
			</div>
		)
	}

}