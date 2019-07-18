import selectedReducer, { INITIAL_STATE as initialState } from './selected';
import MEDIA from '../constants/media';

describe('Media select Reducer', () => {
	it('Sets the initial state', () => {
		const action = { type: 'NOT_MEDIA_ACTION' };

		expect(selectedReducer(undefined, action)).toEqual(initialState);
	});

	it('Sets the selected media MOVIE', () => {
		const payload = { id: 1, type: 'movies' };
		const action = { type: MEDIA.MOVIES_SELECTED, payload };

		expect(selectedReducer(undefined, action)).toEqual({
			...initialState,
			...payload
		});
	});

	it('Sets the loading state on MEDIA_FETCH', () => {
		const action = { type: MEDIA.FETCH };

		expect(selectedReducer(undefined, action)).toEqual({
			...initialState,
			isLoading: true,
		});
	});

	it('Set loading state false on MEDIA_FETCH_FULFILLED', () => {
		const payload = {
			result: 1,
			entities: {
				media: {
					1: { id: 1, title: 'Dumbo' }
				}
			}
		};
		const action = {
			type: MEDIA.FETCH_FULFILLED,
			payload
		};

		expect(selectedReducer(undefined, action)).toEqual({
			...initialState,
			isLoading: false
		});
	});
});
