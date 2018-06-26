import React, { Component } from 'react';
import DateBar from '../containers/date_bar';
import FavouriteDropDown from '../containers/favourite_dropdown';
import GamesList from '../containers/games_list';

export default class GamesIndex extends Component {
  render() {
    return (
      <div>
        <div className="row">
			<h1 className="col-md-12 text-md-center">Baseball App</h1>
		</div>
      	<div className="row">
    		<div className='col-sm-2'>Date:</div>
   			<div className='col-sm-10'><DateBar /></div>
		</div>
      	<div className="row">
    		<div className='col-sm-2'>Favorite Team:</div>
   			 <div className='col-sm-10'><FavouriteDropDown /></div>
		</div>
      	<GamesList />
      </div>
    );
  }
}
