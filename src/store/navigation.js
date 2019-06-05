import { LOCATION_CHANGE } from 'react-router-redux';
import USER from '../constants/user';

const loggedInState = {
	id: 'user',
	to: '/me/list',
	text: 'You',
	submenu: [
		{ id: 'mylist', to: '/me/list', text: 'All' },
		{ id: 'mylist_movies', to: '/me/list/movies', text: 'Just Movies' },
		{ id: 'mylist_series', to: '/me/list/series', text: 'Just Series' },
		{ id: 'logout', to: '/logout', text: 'Logout' }
	]
};
const loggedOutState = { id: 'logout', to: '/login', text: 'Login' };

export const INITIAL_STATE = [{
	id: 'movies',
	to: '/movies/onseed',
	text: 'Movies',
	submenu: [
		{ id: 'all_movies', to: '/movies', text: 'all' },
		{ id: 'upcomming_movies', to: '/movies/upcoming', text: 'upcoming' },
		{ id: 'onseed_movies', to: '/movies/onseed', text: 'onseed' }
	]
}, {
	id: 'series',
	to: '/series/onseed',
	text: 'Series',
	submenu: [
		{ id: 'all_series', to: '/series', text: 'all' },
		{ id: 'onseed_series', to: '/series/onseed', text: 'onseed' }
	]
},
{ id: 'user', to: '/login', text: 'Login' }];

const navigation = (state = INITIAL_STATE, action) => {
	const { type, payload } = action;

	switch (type) {
	case LOCATION_CHANGE:
		return state.map((menu) => {
			let selected = null;

			if (menu.submenu) {
				selected = menu.submenu.find((submenu) => submenu.to === payload.location.pathname);
			}

			if (!selected) {
				return menu;
			}
			return { ...menu, to: selected.to };
		});
	/* case USER.LOGIN:
		return state.map((menu) => (menu.id === 'user') ? loggedInState : menu); */
	case USER.VALIDATE_FULFILLED:
	case USER.FETCH_FULFILLED:
		return state.map((menu) => ((menu.id === 'user') ? loggedInState : menu));
	case USER.LOGOUT:
		return state.map((menu) => ((menu.id === 'user') ? loggedOutState : menu));
	default:
		return state;
	}
};
export default navigation;
