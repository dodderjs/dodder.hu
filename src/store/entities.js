import MEDIA from '../constants/media';

export const INITIAL_STATE = {
	media: {}
};
const entities = (state = INITIAL_STATE, action) => {
	const { type, payload } = action;

	switch (type) {
	case MEDIA.FETCH_FULFILLED:
	case MEDIA.MOVIES_FETCH_FULFILLED:
	case MEDIA.SERIES_FETCH_FULFILLED:
	case MEDIA.MYLIST_FETCH_FULFILLED:
		if (payload && payload.entities) {
			return {
				...state,
				media: {
					...state.media,
					...payload.entities.media || {}
				}
			};
		}
		return state;

	case MEDIA.MYLIST_ADD_FULFILLED:
	case MEDIA.MYLIST_REMOVE_FULFILLED: {
		const element = payload && payload.result;

		if (element && state.media[element.movieId]) {
			const id = element.movieId;
			const changedMedia = {
				...state.media[id],
				wish_added_at: element.added_at || null,
				user_notified_at: null
			};
			return {
				...state,
				media: {
					...state.media,
					[id]: changedMedia
				}
			};
		}
		return state;
	}
	default:
		return state;
	}
};

export default entities;
