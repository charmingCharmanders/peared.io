import FriendsList from './friendsList';
import Leaderboard from './leaderboard';
import Modal from './modal';
import Prompts from './prompts';
import React from 'react';
import Sessions from './sessions';
import Statistics from './statistics';
import { Col, Grid, Row} from 'react-bootstrap';
import { bindActionCreators} from 'redux';
import { connect} from 'react-redux';
import { populateLeaderboard, populateUserToyProblems} from '../actions';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.populateLeaderboard();
    this.props.populateUserToyProblems();
  }

  render() {
    return (
      <div>
        <Grid>
          <Row>
            <Col md={12}>
              <h2>Welcome, {this.props.userProfileData.firstName}!</h2>
            </Col>
          </Row>
          <Statistics />
          <Row>
            <Col md={8}>
              <h3>Recent Sessions</h3>
              <Sessions />
            </Col>
            <Col md={4}>
              <h3>Leaderboard</h3>
              <Leaderboard />
            </Col>
          </Row>
          <Row>
            <Col md={9}>
              <h3>My Prompts</h3>
              <Prompts />
            </Col>
            <Col md={3}>
              <h3>Friends</h3>
              <FriendsList socket={this.props.socket}/>
            </Col>
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
      populateUserToyProblems: populateUserToyProblems
    },
    dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
