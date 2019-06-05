export const loadStoreState = (initialState) => {
	try {
		const serializedState = localStorage.getItem('state');
		if (serializedState) {
			return JSON.parse(serializedState);
		}

		return initialState;
	} catch(e) {
		return undefined;
	}
}
export const saveStoreState = (state) => {
	try {
		const serializedState = JSON.stringify(state);
		localStorage.setItem('state', serializedState);
	} catch(e) {
		// error during the save
	}
}
