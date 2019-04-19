import { CALL_API } from '../constants/api';
import ERRORS from '../constants/error';

const apiDispatch = (action = {}, externalData) => (dispatch) => dispatch({
	[CALL_API]: action,
	...externalData
})
	.catch(error => dispatch({
		type: ERRORS.ADD,
		payload: error
	}));

export default apiDispatch;
