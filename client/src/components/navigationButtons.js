import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Button, ButtonToolbar} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { openModal, closeModal, sessionToDashboard } from '../actions';

class NavigationButtons extends React.Component {
  constructor(props) {
    super(props);
    this.joinRoom = this.joinRoom.bind(this);
    this.leaveRoom = this.leaveRoom.bind(this);
  }

  joinRoom() {
    this.props.openModal('startSession');
    this.props.socket.emit('join room'); 
  }

  leaveRoom() {
    this.props.socket.emit('end session', 'endSession');
  }

  render() {
    const styles = {
      buttonToolbar: {
        float: 'right',
        marginTop: '7px'
      }
    };
    if (this.props.nav) {
      return (
        <ButtonToolbar style={styles.buttonToolbar}>
          <Button bsStyle="info" onClick={this.joinRoom.bind(this)}>Start Session</Button>
          <Button href="/logout">Logout</Button>
        </ButtonToolbar>
      );
    }
    return ( 
      <ButtonToolbar style={styles.buttonToolbar}>
        <Button bsStyle="info" onClick={this.leaveRoom.bind(this)}>End Session</Button>
      </ButtonToolbar>
    );
  }
}

const mapStateToProps = function(state) {
  return {
    nav: state.nav
  };
};

const mapDispatchToProps = function(dispatch) {
  return bindActionCreators(
    {
      closeModal: closeModal,
      openModal: openModal,
      sessionToDashboard: sessionToDashboard
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(NavigationButtons);
