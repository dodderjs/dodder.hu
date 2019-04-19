import medialistReducer, { INITIAL_STATE as initialState } from './medialist';
import MEDIA from '../constants/media';

describe('Media Reducer', () => {
	it('Sets the initial state', () => {
		const action = { type: 'NOT_MEDIA_ACTION' };

		expect(medialistReducer(MEDIA.MEDIAS)(undefined, action)).toEqual(initialState);
	});

	it('Change filter', () => {
		const payload = { filter: 'onseed' }
		const action = {
			type: MEDIA.SET_FILTER, 
			payload
		};

		expect(medialistReducer(MEDIA.MEDIAS)(undefined, action)).toEqual(initialState);
	});

	it('Saves the media data to the store on MEDIA_FETCH_FULFILLED', () => {
		const payload = { entities: {1: {}, 2: {}, 3: {}}, result: [1,2,3], count: 3, timestamp: Date.now() };
		const medialistData = [1,2,3] ;

		const action = {
			type: MEDIA.FETCH_FULFILLED,
			payload
		};

		expect(medialistReducer(MEDIA.MEDIAS)(undefined, action)).toEqual(medialistData);
	});
});
