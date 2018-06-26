import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import ReduxPromise from 'redux-promise';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import GamesIndex from './components/games_index';
import GameDetails from './containers/game_details'
import reducers from './reducers';

//Using Redux middleware redux-promise to handle valid and error actions
const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);
//Using react router for navigation between homepage and details view
ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
    	<div>
    		<Switch>
    			<Route path="/games/:year/:month/:day/:id" component={GameDetails} />
    			<Route path="/" component={GamesIndex} />
    		</Switch>
    	</div>
    </BrowserRouter>
  </Provider>
  , document.querySelector('.container'));
