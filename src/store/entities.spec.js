import entitiesReducer, { INITIAL_STATE as initialState } from './entities';
import MEDIA from '../constants/media';


describe('Loading Reducer', () => {
	it('Sets the initial state', () => {
		const action = { type: 'NOT_MEDIA_ACTION' };

		expect(entitiesReducer(undefined, action)).toEqual(initialState);
	});

	it('Fulfilled a media fetch', () => {
		const payload = {
			entities: {
				movies: { 1: { id: 1, name: 'test1' }, 2: { id: 2, name: 'test2' } },
				series: { 4: { id: 4, name: 'test4' }, 6: { id: 6, name: 'test6' } }
			}
		}
		const action = {
			type: MEDIA.FETCH_FULFILLED,
			payload
		};

		expect(entitiesReducer(undefined, action)).toEqual(payload.entities);
	});

});
