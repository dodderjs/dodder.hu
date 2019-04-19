export const INITIAL_STATE = false;

const loading = (type) => (state = INITIAL_STATE, action) => {
	switch(action.type) {
	case `${type}_NEXT_PAGE`:
	case `${type}_FETCH`:
		return true;
	case `${type}_FETCH_FULFILLED`:
	case `${type}_FETCH_REJECTED`:
		return false;
	default:
		return state;
	}
};

export default loading;
