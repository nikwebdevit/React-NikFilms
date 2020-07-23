import React, { Component } from 'react'
import {Route, Switch, Redirect, withRouter} from 'react-router-dom'
import Layout from './hoc/Layout'
import Home from './pages/Home'
import Films from './pages/Films'
import Ser from './pages/Ser'
import Games from './pages/Games'
import Auth from './pages/Auth'
import Add from './pages/Add'
import SinglePage from './pages/SinglePage'
import Error from './pages/Error'
import {StyleRoot} from 'radium'
import axios from 'axios'

class App extends Component {
	state = {
		auth: false,
		token: null,
		errorMessage: false,
		isOpenMenu: false,
		loading: true,
		homeFilterStatus: 'last',
		listFilterStatus: 'rating',
		homeFilter: [
			{name: 'last', label: 'Последнее'},
			{name: 'rating', label: 'По рейтингу'},
		],
		dataFilms: [],
		dataSer: [],
		dataGames: []
	}

	filterChange(items, filter) {
		switch (filter) {
			case 'last':
				return items.sort((a, b) => new Date(b.date) - new Date(a.date))
			case 'rating':
				return items.sort((a, b) => +b.rating - a.rating)
			default:
				return items
		}
	}

	onFilterChange = (homeFilterStatus) => {
		this.setState({homeFilterStatus})
	}

	openMenu = (isOpenMenu) => {
		this.setState({isOpenMenu})
	}

	onChangeErrorMsg = () => {
		this.setState({errorMessage: true})
	}

	onChangeAuth = (token) => {
		this.setState({auth: true, token})
	}

	onResetAuth = (token) => {
		this.setState({auth: false, token: null})
	}

	addNewPost = async (post, rub) => {
		const auth = this.state.token
		if (rub === 'films') {
			await axios.post(`https://nikfilms-f53a1.firebaseio.com/dataFilms.json?auth=${auth}`, post)
			const dataFilms = [...this.state.dataFilms, post]
			this.setState({dataFilms})
		} else if (rub === 'ser') {
			await axios.post(`https://nikfilms-f53a1.firebaseio.com/dataSer.json?auth=${auth}`, post)
			const dataSer = [...this.state.dataSer, post]
			this.setState({dataSer})
		} else {
			await axios.post(`https://nikfilms-f53a1.firebaseio.com/dataGames.json?auth=${auth}`, post)
			const dataGames = [...this.state.dataGames, post]
			this.setState({dataGames})
		}
	}

	async componentDidMount() {
		try {
			const res1 = await axios.get('https://nikfilms-f53a1.firebaseio.com/dataFilms.json')
			const res2 = await axios.get('https://nikfilms-f53a1.firebaseio.com/dataSer.json')
			const res3 = await axios.get('https://nikfilms-f53a1.firebaseio.com/dataGames.json')
			const dataFilms = []
			const dataSer = []
			const dataGames = []

			if (res1.data !== null) {
				Object.values(res1.data).forEach((key, index) => {
					dataFilms.push(key)
				})
			}
			if (res2.data !== null) {
				Object.values(res2.data).forEach((key, index) => {
					dataSer.push(key)
				})
			}
			if (res3.data !== null) {
				Object.values(res3.data).forEach((key, index) => {
					dataGames.push(key)
				})
			}

			this.setState({dataFilms, dataSer, dataGames, loading: false})
		} catch (e) {
			this.setState({errorMessage: true})
		}
	}

	render() {
		const {
			auth,
			homeFilter,
			homeFilterStatus,
			dataFilms,
			dataSer,
			dataGames,
			listFilterStatus,
			isOpenMenu,
			errorMessage
		} = this.state

		const dataFilmsSer = [...dataFilms, ...dataSer]

		const homeData = this.filterChange(dataFilmsSer, homeFilterStatus)
		const filmData = this.filterChange(dataFilms, listFilterStatus)
		const serData = this.filterChange(dataSer, listFilterStatus)
		const gameData = this.filterChange(dataGames, listFilterStatus)

		let routes = (
				<Route path='/auth' exact render={() => (
					<Auth onChangeAuth={this.onChangeAuth}/>
				)}/>
		)

		if (auth) {
			routes = (
					<Route path='/add' exact render={() => (
						<Add
							addNewPost={this.addNewPost}
							onChangeErrorMsg={this.onChangeErrorMsg}
							errorMessage={errorMessage}
							token={this.state.token}
						/>
					)}/>
			)
		}

		return (
			<StyleRoot>
				<Layout
					isOpenMenu={isOpenMenu}
					openMenu={this.openMenu}
					auth={auth}
					onResetAuth={this.onResetAuth}
				>
					<Switch>
						<Route path='/' exact render={() => (
							<Home
								data={homeData}
								homeFilter={homeFilter}
								homeFilterStatus={homeFilterStatus}
								onFilterChange={this.onFilterChange}
								loading={this.state.loading}
								errorMessage={errorMessage}
							/>
						)}/>

						<Route path='/films' exact render={() => (
							<Films data={filmData} loading={this.state.loading}/>
						)}/>

						<Route path='/ser' exact render={() => (
							<Ser data={serData} loading={this.state.loading}/>
						)}/>

						<Route path='/games' exact render={() => (
							<Games data={gameData} loading={this.state.loading}/>
						)}/>

						<Route path='/:rub/:id'  render={({ match }) => {
							const Films = dataFilms.filter(e => e.titleEn.split(' ').join('-') === match.params.id)
							const Ser = dataSer.filter(e => e.titleEn.split(' ').join('-') === match.params.id)
							const Games = dataGames.filter(e => e.titleEn.split(' ').join('-') === match.params.id)
							switch (match.params.rub) {
								case 'films':
									return ( Films.length !== 0 ? <SinglePage data={Films}/> : <Error/> )
								case 'ser':
									return Ser.length !== 0 ? <SinglePage data={Ser}/> : <Error/>
								case 'games':
									return Games.length !== 0 ? <SinglePage data={Games}/> : <Error/>
								default:
									return <Error/>
							}
						}}/>

						{routes}

						<Redirect to='/' />
					</Switch>
				</Layout>
			</StyleRoot>
		)
	}
}

export default withRouter(App)