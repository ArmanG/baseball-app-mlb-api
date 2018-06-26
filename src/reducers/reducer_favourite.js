import { SET_FAVOURITE } from '../actions/index';

export default function favouriteReducer(state={}, action) {
	switch (action.type) {
		case SET_FAVOURITE:
			return {
					...state, //state we had before
					favourite: action.payload //will be replaced with this
				}
	}
	return state;
}