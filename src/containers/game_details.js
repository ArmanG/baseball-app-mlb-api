import React , { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchGame } from '../actions';
import TeamToggle from '../containers/team_toggle';

class GameDetails extends Component {

	componentDidMount(){
		const params = this.props.match.params;
		//http://gd2.mlb.com/components/game/mlb/year_2016/month_10/day_04/gid_2016_10_04_balmlb_tormlb_1/boxscore.json
		//http://gd2.mlb.com/components/game/mlb/year_2018/month_05/day_24/gid_2018_05_24_pitmlb_cinmlb_1/boxscore.json
		const gid = `gid_${params.year}_${params.month}_${params.day}_${params.id.replace(/-/g, '_')}`;
		const id = `year_${params.year}/month_${params.month}/day_${params.day}/${gid}`;
		this.props.fetchGame(id); //fetch the game from game directory - link is given from parsed id
	}

	render(){
		if (!this.props.boxscore){ //wait for state to change
			return <div>Loading</div>;
		}
		if (this.props.isError){ //boxscore may not be available due to status of game
			//Link is a react router function to navigate, looks like aref
			return (
				<div>
					<Link to="/">Back To Index</Link>
					<div>Something went wrong. Boxscore may not be ready yet.</div>
				</div>
			);
		}
		//boxscore might be available but depending on status, no innings available
		if (!Array.isArray(this.props.boxscore.linescore.inning_line_score)) {
			return (
				<div>
					<Link to="/">Back To Index</Link>
					<div>Game is in Progress but no innings are available yet. Please wait.</div>
				</div>
			);
		}
		return (
			<div>
				<div className="row">
					<h1 className="col-md-12 text-md-center">Game Details</h1>
				</div>
				<Link to="/"><h2>Back To Index</h2></Link>
				<table id="detailsTable" className="table table-hover">
					<thead>
						<tr>
							<th>Team</th>
							 {this.props.boxscore.linescore.inning_line_score.map((score, i) => <th key={i}>{score.inning}</th>)}
							 <th>R</th>
							 <th>H</th>
							 <th>E</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>{this.props.boxscore.home_team_code.toUpperCase()}</td>
							{this.props.boxscore.linescore.inning_line_score.map((score, i) => <td key={i}>{score.home}</td>)}
							<td>{this.props.boxscore.linescore.home_team_runs}</td>
							<td>{this.props.boxscore.linescore.home_team_hits}</td>
							<td>{this.props.boxscore.linescore.home_team_errors}</td>
						</tr>
						<tr>
							<td>{this.props.boxscore.away_team_code.toUpperCase()}</td>
							{this.props.boxscore.linescore.inning_line_score.map((score, i) => <td key={i}>{score.away}</td>)}
							<td>{this.props.boxscore.linescore.away_team_runs}</td>
							<td>{this.props.boxscore.linescore.away_team_hits}</td>
							<td>{this.props.boxscore.linescore.away_team_errors}</td>
						</tr>
					</tbody>
				</table>
				<TeamToggle />
			</div>
		);	
	}
}

//wrap state returned by reducer to props of component
function mapStateToProps(state){
	return { 
			boxscore : state.games_state.boxscore,
			isError : state.games_state.isError

		};
}

//connect component and redux to create a container (component with state)
export default connect(mapStateToProps, { fetchGame })(GameDetails);