import React, {Component} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import { Link } from 'react-router-dom';

class GamesList extends Component {

	/*
		We want to bold the winning team name and score
	*/
	setWinningTeam(game) {
		//if no linescore, then no winning team
		if (typeof game.linescore !== "undefined" 
			&& typeof game.linescore !== "undefined") {
			if (game.linescore.r.home > game.linescore.r.away) {
				game.home_team_name = <b>{game.home_team_name}</b>
				game.linescore.r.home = <b>{game.linescore.r.home}</b>
			}
			else {
				game.away_team_name = <b>{game.away_team_name}</b>
				game.linescore.r.away = <b>{game.linescore.r.away}</b>
			}
		}
	}

	/*
		Param: object of games
		Return: jsx of rows of games
	*/
	renderGames(games) {
		if (_.isEmpty(games)) {
			return <tr>{"No games today"}</tr>;
		}
		//We need to separate the games that contain the favorite team
		//So we can move the favorites to the top of the table
		let favouriteGames = _.filter(games, game => {
			return game.home_team_name == this.props.favourite || game.away_team_name == this.props.favourite;
		});
		let otherGames = _.filter(games, game => {
			return game.home_team_name != this.props.favourite && game.away_team_name != this.props.favourite;
		});

		//moved favorites to the front
		return _.map([...favouriteGames, ...otherGames], game => {
			this.setWinningTeam(game); // to bold winning team
			return (
				<tr key={game.id}>
					<td>
						<Link to={`/games/${game.id}`}>Details</Link>
					</td>
					<td>{game.status.status}</td>
					<td>{game.home_team_name}</td>
				    <td>{game.away_team_name}</td>
				    <td>{ typeof game.linescore === "undefined" ? "-" : game.linescore.r.home}</td>
				    <td>{ typeof game.linescore === "undefined" ? "-" : game.linescore.r.away}</td>
				</tr>
			);
		});
	}

	render() {
		if (!this.props.games) {
			return <div>Loading...</div>;
		}
		if (this.props.isError) {
			return <div> Unable to load data </div>
		}
		return (
			<table className="table table-hover table-condensed">
				<thead>
					<tr>
						<th>Check Details</th> 
						<th>Status</th>
						<th>Home Team</th>
						<th>Away Team</th>
						<th>Home Team Score</th>
						<th>Away Team Score</th>
					</tr>
				</thead>
				<tbody>{this.renderGames(this.props.games)}</tbody>
			</table>
		);
	}
}

//wrap state returned by reducer to props of component
function mapStateToProps(state){
	return { 
			games: state.games_state.games,
			isError: state.games_state.isError,
			favourite: state.favourite_state.favourite
		};
}

//connect component and redux to create a container (component with state)
export default connect(mapStateToProps)(GamesList);