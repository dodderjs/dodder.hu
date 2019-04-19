export const INITIAL_STATE = {
	page: 0,
	totalCount: 0
};

const paginate = (TYPE) => {
	return (state = INITIAL_STATE, action) => {
		const {type, payload} = action;

		switch (type) {
		case `${TYPE}_SET_FILTER`:
			return {
				...state,
				page: 0
			}
		case `${TYPE}_NEXT_PAGE`:
			return {
				...state,
				page: payload.page
			}
		case `${TYPE}_FETCH_FULFILLED`:
			return {
				...state,
				totalCount: payload.count
			};

		default:
			return state;
		}
	};
};
export default paginate;
