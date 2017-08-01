import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Table, ButtonToolbar, Button, Navbar, CollapsibleNav, NavItem, NavDropdown, Nav, MenuItem, Grid, Col, Row} from 'react-bootstrap';

class Leaderboard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Table responsive bordered condensed hover striped>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Rating</th>
          </tr>
        </thead>
        <tbody>
          {this.props.leaderboard.leaderArray ? this.props.leaderboard.leaderArray.map((leader, index) =>
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{leader.name}</td>
              <td>{Number(leader.rating).toFixed()}</td>
            </tr>) : ''}
        </tbody>
      </Table>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userFriendData:  state.userFriendData,
    userProfileData:  state.userProfileData,
    leaderboard: state.leaderboard
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Leaderboard);