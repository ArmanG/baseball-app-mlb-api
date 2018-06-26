import React, {Component} from 'react';
import Select from 'react-select';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setFavourite } from '../actions/index';
import _ from 'lodash';

import 'react-select/dist/react-select.css';

class FavouriteDropDown extends Component {
	constructor (props) {
	    super(props)
	    this.state = {
	      favourite: "Blue Jays"
	    };
	    this.handleChange = this.handleChange.bind(this);
  	}

  	componentDidMount() {
    	this.props.setFavourite(this.state.favourite);
    	this.populateOptions();
  	}

  	/*
	Options for the dropdown need to generate dynamically
  	*/
	populateOptions(){
		let options = [];
		//options must be in the form {value: label:}
		_.map(this.props.games, game => {
			options.push({value: game.home_team_name, label: game.home_team_name});
			options.push({value: game.away_team_name, label: game.away_team_name});
		});
		return options;
	}

	handleChange(favourite){
		this.setState({ favourite: favourite.value });
		this.props.setFavourite(favourite.value);
	}

	render() {
		if (!this.props.games) {
			return (<div>Loading...</div>);
		}
	    return (
	      <Select
	        name="form-field-name"
	        value={this.state.favourite}
	        onChange={this.handleChange}
	        options={this.populateOptions()} 
	        clearable={false}/>
	    );
  	}	
}

//wrap state returned by reducer to props of component
function mapStateToProps(state){
	return { 
			games: state.games_state.games
		};
}

//wrap action creators and dispatch method to props of container
function mapDispatchToProps(dispatch) {
	return bindActionCreators({ setFavourite }, dispatch);
}

//connect component and redux to create a container (component with state)
export default connect(mapStateToProps, mapDispatchToProps)(FavouriteDropDown);
