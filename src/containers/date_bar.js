import React, {Component} from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { connect } from 'react-redux';
import { fetchGames } from '../actions/index';

import 'react-datepicker/dist/react-datepicker.css';

class DateBar extends Component {

  constructor (props) {
    super(props)
    this.state = {
      date: moment() // moment is an object with a timestamp
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(date) {
    this.setState({ date });
    this.props.fetchGames(date); //trigger action to games given date
  }
  
  componentDidMount() {
    this.props.fetchGames(this.state.date);
  }

  render() {
    return <DatePicker
        selected={this.state.date}
        onChange={this.handleChange} />;
  }

} 

export default connect(null, { fetchGames })(DateBar);