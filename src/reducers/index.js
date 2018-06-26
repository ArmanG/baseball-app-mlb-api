import { combineReducers } from 'redux';
import gamesReducer from './reducer_games';
import favouriteReducer from './reducer_favourite';

/*
to create a store we need to pass in a single reducer
*/
const rootReducer = combineReducers({
  games_state: gamesReducer,
  favourite_state: favouriteReducer
});

export default rootReducer;
