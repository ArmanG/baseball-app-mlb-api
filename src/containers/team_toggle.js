import React, {Component} from 'react';
import Select from 'react-select';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class TeamToggle extends Component {
	constructor (props) {
	    super(props)
	    this.state = { //selectedTeam is needed for the batters table
	      selectedTeam: {value: "home", label: this.props.boxscore.home_sname}
	    };
	    this.handleChange = this.handleChange.bind(this);
  	}

  	//options for team toggle
  	populateOptions(){
  		let options = [];
  		//here I change the value to home to easily 
  		//differentiate between the home and away batters
  		options.push({value: "home", label: this.props.boxscore.home_sname});
  		options.push({value: "away", label: this.props.boxscore.away_sname});
  		return options;
  	}

  	populateBatterTable(){
  		let index = 0
  		//index 0 always represents home in batter array
  		if (this.state.selectedTeam.value === "away") {
  			index = 1;
  		}
  		//populate the table with the batters in the batters array
  		//at proper index, 0 or 1
  		return this.props.boxscore.batting[index].batter.map(batter => {
  				return (
  					<tr key={batter.id}>
		  				<td>{batter.name_display_first_last}</td>
		  				<td>{batter.ab}</td>
						<td>{batter.r}</td>
						<td>{batter.h}</td>
						<td>{batter.rbi}</td>
						<td>{batter.bb}</td>
						<td>{batter.so}</td>
						<td>{batter.avg}</td>
					</tr>
				);
  			});
  	}

  	//user toggled
  	handleChange(selectedTeam){
  		this.setState({ selectedTeam: selectedTeam });
  	}

  	render() {
	    return (
	    	<div>
				<Select
				name="form-field-name"
				value={this.state.selectedTeam}
				onChange={this.handleChange}
				options={this.populateOptions()} 
				clearable={false} />
		      	<table id="battersTable" className="table table-hover">
					<thead>
						<tr>
							<th>Name</th>
							<th>AB</th>
							<th>R</th>
							<th>H</th>
							<th>RBI</th>
							<th>BB</th>
							<th>SO</th>
							<th>AVG</th>
						</tr>
					</thead>
					<tbody>{this.populateBatterTable()}</tbody>
				</table>
			</div>
	    );
  	}
}

//wrap state returned by reducer to props of component
function mapStateToProps(state){
	return { 
			boxscore : state.games_state.boxscore
		};
}

//connect component and redux to create a container (component with state)
export default connect(mapStateToProps)(TeamToggle);