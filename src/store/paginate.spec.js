import paginateReducer, { INITIAL_STATE as initialState } from './paginate';
import MEDIA from '../constants/media';

describe('Paginate Reducer', () => {
	it('Sets the initial state', () => {
		const action = { type: 'NOT_MEDIA_ACTION' };

		expect(paginateReducer(MEDIA.MEDIAS)(undefined, action)).toEqual(initialState);
	});

	it('Reset page number and total item count on filter change', () => {
		const payload = { filter: 'onseed' }
		const action = {
			type: MEDIA.SET_FILTER, 
			payload
		};

		expect(paginateReducer(MEDIA.MEDIAS)(undefined, action)).toEqual(initialState);
	});
	it('Next page', () => {
		const pageData = {page: 1};
		const transformedPageData = {page: 1};

		const action = {
			type: MEDIA.NEXT_PAGE,
			payload: pageData
		};

		expect(paginateReducer(MEDIA.MEDIAS)(undefined, action)).toEqual({
			...initialState,
			...transformedPageData
		});
	});

	it('Update page and total count on media list fetch MEDIA_FETCH_FULFILLED', () => {
		const payload = { entities: {}, result:[], count: 3, timestamp: Date.now() };
		const transformedMediaData = {totalCount: 3};

		const action = {
			type: MEDIA.FETCH_FULFILLED,
			payload
		};

		expect(paginateReducer(MEDIA.MEDIAS)(undefined, action)).toEqual({
			...initialState,
			...transformedMediaData
		});
	});

});
