import FriendsList from './friendsList';
import HistoryTable from './historyTable';
import Leaderboard from './leaderboard';
import Modal from './modal';
import React from 'react';
import Stats from './stats';
import YourToyProblems from './yourToyProblems';
import { Col, Grid, Row} from 'react-bootstrap';
import { bindActionCreators} from 'redux';
import { connect} from 'react-redux';
import { populateLeaderboard, populateUsers, populateUserToyProblems} from '../actions';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.populateLeaderboard();
    this.props.populateUsers();
    this.props.populateUserToyProblems();
  }

  render() {
    return (
      <div>
        <Grid>
          <Row className='show-grid'>
            <Col md={12}>
              <h2>Welcome, {this.props.userProfileData.firstName}!</h2>
            </Col>
          </Row>
          <Row className='show-grid'>
            <Col md={12}>
              <Stats />
            </Col>
          </Row>
          <Row className='show-grid'>
            <Col md={9}><HistoryTable /></Col>
            <Col md={3}><Leaderboard /></Col>
          </Row>
          <Row className='show-grid'>
            <Col md={9}><YourToyProblems /></Col>
            <Col md={3}><FriendsList /></Col>
          </Row>
        </Grid>
        <Modal socket={this.props.socket} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userProfileData: state.userProfileData
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      populateLeaderboard: populateLeaderboard,
      populateUsers: populateUsers,
      populateUserToyProblems: populateUserToyProblems
    },
    dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
