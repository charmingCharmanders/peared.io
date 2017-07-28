import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {ButtonToolbar, Button, Navbar, CollapsibleNav, NavItem, NavDropdown, Nav, MenuItem} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import {openModal, closeModal, sessionToDashboard} from '../actions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

class Navigation extends React.Component {
  
  constructor(props) {
    super(props);
    this.joinRoom = this.joinRoom.bind(this);
    this.leaveRoom = this.leaveRoom.bind(this);
  }

  joinRoom() {
    console.log('this.props.socket:', this);
    this.props.openModal();
    this.props.socket.emit('join room'); 
  }

  leaveRoom() {
    this.props.sessionToDashboard();
    this.props.updateButtonStatus(true);
    this.props.updateCode(null);
    this.props.updateCurrentSession(null);
    this.props.updateRoomId(null);
    this.props.updateTestResults(null);
    this.props.socket.emit('leave room');
  }

  render() {
    let buttonSet = null;
    let extraInfo = null;
    if (this.props.nav) {
      buttonSet = 
        <ButtonToolbar style={{marginTop: '7px', float: 'right', marginRight: '-15px'}}>
          <Button bsStyle="info" onClick={this.joinRoom.bind(this)}>Start Session</Button>
          <Button href="/logout">Log out</Button>
        </ButtonToolbar>;
      extraInfo = <p className="navbar-text">{this.props.onlineUsers} users currently online</p>;
    } else {
      buttonSet = 
        <ButtonToolbar style={{marginTop: '7px', float: 'right', marginRight: '-15px'}}>
          <Button>Swap Roles</Button>
          <LinkContainer to='/'>
            <Button bsStyle="info" onClick={this.leaveRoom.bind(this)}>End Session</Button>
          </LinkContainer>
        </ButtonToolbar>;
      extraInfo = <p className="navbar-text">{this.props.currentTime}</p>;
    }    

    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="/">Peared.io</a>
          </Navbar.Brand>
          {extraInfo}
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          {buttonSet}
        </Navbar.Collapse>
      </Navbar>
    );
  }

}

var mapStateToProps = function(state) {
  return {
    nav: state.nav,
    onlineUsers: state.onlineUsers,
    currentTime: state.currentTime
  };
};

var mapDispatchToProps = function(dispatch) {
  return bindActionCreators(
    {
      openModal: openModal,
      sessionToDashboard: sessionToDashboard,
      closeModal: closeModal
    }, dispatch);
};


export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
