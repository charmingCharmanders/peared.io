import React from 'react';
import ReactDOM from 'react-dom';
import HistoryTable from './historyTable';
import FriendsList from './friendsList';
import YourToyProblems from './yourToyProblems';
import Leaderboard from './leaderboard';
import Stats from './stats';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import {Table, ButtonToolbar, Button, Navbar, CollapsibleNav, NavItem, NavDropdown, Nav, MenuItem, Grid, Col, Row} from 'react-bootstrap';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {closeQuestionModal, updateButtonStatus, populateUserToyProblems, updateRoomId, updatePrompt, updateCode, updateTestResults, closeModal, dashboardToSession, populateLeaderboard} from '../actions';
import {LinkContainer} from 'react-router-bootstrap';
import io from 'socket.io-client';
import Modal from './modal';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.populateUserToyProblems();
    this.props.populateLeaderboard();
  }

  render() {
    let questionModal =
      this.props.sessionData.sessionArray ? 
        <Modal show={this.props.questionModal} onHide={this.props.closeQuestionModal}>
          <Modal.Header closeButton>
            <Modal.Title>{this.props.sessionData.sessionArray[this.props.currentQuestion].promptName}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>{this.props.sessionData.sessionArray[this.props.currentQuestion].lengthOfSession}</h4>
            <h5>{this.props.sessionData.sessionArray[this.props.currentQuestion].solution}</h5>
          </Modal.Body>
          <Modal.Footer>
            <h5>{this.props.sessionData.sessionArray[this.props.currentQuestion].numberOfTestsPassed} /
              {this.props.sessionData.sessionArray[this.props.currentQuestion].numberOfTests}
            </h5>
          </Modal.Footer>
        </Modal> : '';

    return (
      <div>
        <Grid>
          <Row className='show-grid'>
            <Col md={12} ><h6>Dashboard</h6></Col>
          </Row>
          <Row className='show-grid'>
            <Col md={12}><h2>Welcome, {this.props.userProfileData.firstName}! </h2></Col>
          </Row>
          {questionModal}
          <br />
          <Row className='show-grid'>
            <Col md={9}><HistoryTable /></Col>
            <Col md={3}><FriendsList /></Col>
            <Col md={3}><Leaderboard /></Col>
          </Row>
          <YourToyProblems />
          <Stats />
        </Grid>
        <Modal socket={this.props.socket} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    modal: state.modal,
    currentQuestion: state.currentQuestion,
    buttonStatus: state.buttonStatus,
    sessionData: state.sessionData,
    userProfileData: state.userProfileData,
    questionModal: state.questionModal
  };
};

var mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      populateUserToyProblems: populateUserToyProblems,
      closeQuestionModal: closeQuestionModal,
      closeModal: closeModal,
      dashboardToSession: dashboardToSession,
      updateRoomId: updateRoomId,
      updatePrompt: updatePrompt,
      updateCode: updateCode,
      populateLeaderboard: populateLeaderboard,
      updateButtonStatus: updateButtonStatus
    },
    dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
