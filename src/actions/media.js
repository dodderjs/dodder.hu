import MEDIA from '../constants/media';
import { ENDPOINTS } from '../config';
import apiDispatch from './api';
import Schemas from '../schemas';

const typeMap = {
	movies: {
		endpoint: ENDPOINTS.MOVIES,
		name: MEDIA.MOVIES,
	},

	series: {
		endpoint: ENDPOINTS.SERIES,
		name: MEDIA.SERIES,
	},

	mylist: {
		endpoint: ENDPOINTS.MYLIST,
		name: MEDIA.MYLIST,
	}
}
export const setFilter = (type, filter, queries) => (dispatch, getState) => {
	dispatch({
		type: `${typeMap[type].name}_SET_FILTER`,
		payload: {
			filter: filter,
			queries: queries
		}
	});
	
	fetch(type)(dispatch, getState);
}

export const fetch = (type) => (dispatch, getState) => {
	const {
		lists: { 
			[type]: {
				filter,
				queries,
				pagination: { page }
			}
		}
	} = getState();

	return apiDispatch({
		type: `${typeMap[type].name}_FETCH`,
		schema: Schemas.MEDIA_ARRAY,
		endpoint: typeMap[type].endpoint,
		params: filter === 'all' ? {} : { filter },
		queries: { page, ...queries }
	})(dispatch, getState);
}

export const nextPage = (type) => (dispatch, getState) => {
	const {
		lists: {
			[type]: {
				pagination: { page }
			}
		}
	} = getState();

	dispatch({
		type: `${typeMap[type].name}_NEXT_PAGE`,
		payload: {
			page: page + 1
		}
	});
	fetch(type)(dispatch, getState);
}

export const loadById = (type = 'movies', id) => (dispatch, getState) => {
	dispatch({
		type: `${typeMap[type].name}_SELECTED`,
		payload: {
			id,
			type
		}
	});
	
	return apiDispatch({
		type: MEDIA.FETCH,
		schema: Schemas.MEDIA,
		endpoint: ENDPOINTS.MEDIA_DETAILS,
		params: { 
			id,
			type
		}
	})(dispatch, getState);
}
