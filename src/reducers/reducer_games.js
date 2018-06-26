import _ from 'lodash';
import { FETCH_GAMES, FETCH_GAME, FETCH_GAME_ERROR, FETCH_GAMES_ERROR} from '../actions/index';

export default function gamesReducer(state={}, action) {
	//action is a promise so check the status and change to error type if needed
	if (action.type == FETCH_GAME && action.error) {
		action.type = FETCH_GAME_ERROR;
	}
	if (action.type == FETCH_GAMES && action.error) {
		action.type = FETCH_GAMES_ERROR;
	}
	switch (action.type) {
		case FETCH_GAMES: //never manipulate state, return a new instance of state
			//payload returned might have no games
			if (typeof action.payload.data.data.games.game === "undefined") {
				return {
						games: [],
						isError: false
					};
			}
			else {
				//payload returned might be a single game
				if (Array.isArray(action.payload.data.data.games.game)) {
					return {
							//.mapKeys takes an array and creates an object from the elements id key
							games: _.mapKeys(action.payload.data.data.games.game, 'id'),
							isError: false
						};
				}
				return {
						games: _.mapKeys([action.payload.data.data.games.game], 'id'),
						isError: false
					};
			}
		case FETCH_GAME:
			return { 
					...state, 
					...action.payload.data.data, 
					isError: false 
				};
		case FETCH_GAME_ERROR:
  			return {
    				...state,
    				boxscore:{}, //no boxscore exists
    				isError: true,
  				};
  		case FETCH_GAMES_ERROR:
  			return {
  					games: [], 
  					isError: true //to indicate we want to display error
  				};
	}
	return state;
}