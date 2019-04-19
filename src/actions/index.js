import { Schemas } from '../schemas';
import {
	CALL_API,
	FETCH_SERIES, FETCH_SERIESLIST,
	FETCH_MOVIE, FETCH_MOVIESLIST,
	FETCH_USER_ITEMLIST
} from '../actionTypes';

export const loadMovieById = (id, requiredFields = []) => (dispatch, getState) => {
	const movie = getState().entities.movies.id;

	if (movie && requiredFields.every(key => movie.hasOwnProperty(key))) {
		return null;
	}

	return dispatch({
		[CALL_API]: {
			type: FETCH_MOVIE,
			schema: Schemas.MOVIE,
			endpoint: `/movies/${id}`
		}
	});
};

export const loadSeriesById = (id, requiredFields = []) => (dispatch, getState) => {
	const series = getState().entities.series.id;

	if (series && requiredFields.every(key => series.hasOwnProperty(key))) {
		return null;
	}

	return dispatch({
		[CALL_API]: {
			type: FETCH_SERIES,
			schema: Schemas.SERIES,
			endpoint: `/series/${id}`
		}
	});
};

export const fetchMovies = (filter, nextPage = false) => (dispatch, getState) => {
	const {
		pageCount = 0
	} = getState().pagination.moviesByFilter[filter] || {};

	if (pageCount > 0 && !nextPage) {
		return null;
	}

	return dispatch({
		filter,
		[CALL_API]: {
			type: FETCH_MOVIESLIST,
			schema: Schemas.MOVIE_ARRAY,
			endpoint: `/movies${getUrl(filter, pageCount)}`
		}
	});
};

export const fetchSeries = (filter, nextPage = false) => (dispatch, getState) => {
	const {
		pageCount = 0
	} = getState().pagination.seriesByFilter[filter] || {};

	if (pageCount > 0 && !nextPage) {
		return null;
	}

	return dispatch({
		filter,
		[CALL_API]: {
			type: FETCH_SERIESLIST,
			schema: Schemas.SERIES_ARRAY,
			endpoint: `/series${getUrl(filter, pageCount)}`
		}
	});
};

export const fetchUserItemlist = (filter, nextPage = false) => (dispatch, getState) => {
	const {
		pageCount = 0
	} = getState().pagination.userContentByFilter[filter] || {};

	if (pageCount > 0 && !nextPage) {
		return null;
	}

	return dispatch({
		filter,
		[CALL_API]: {
			type: FETCH_USER_ITEMLIST,
			schema: Schemas.MEDIA_ARRAY,
			endpoint: `/user/me${getUrl(filter, pageCount)}`
		}
	});
};

const getUrl = (pageFilter, pageCount) => {
	let filter = (pageFilter && pageFilter !== 'all') ? '/' + pageFilter : '';
	let page = pageCount > 0 ? `?page=${pageCount}` : '';

	return `${filter}${page}`;
};
