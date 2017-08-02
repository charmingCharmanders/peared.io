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
          <Row className='show-grid'>
            <Col md={12}>
              <h2>Welcome, {this.props.userProfileData.firstName}!</h2>
            </Col>
          </Row>
          <Statistics />
          <Row className='show-grid'>
            <Col md={9}><Sessions /></Col>
            <Col md={3}><Leaderboard /></Col>
          </Row>
          <Row className='show-grid'>
            <Col md={9}><Prompts /></Col>
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
      populateUserToyProblems: populateUserToyProblems
    },
    dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
