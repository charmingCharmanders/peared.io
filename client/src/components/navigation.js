import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {ButtonToolbar, Button, Navbar, CollapsibleNav, NavItem, NavDropdown, Nav, MenuItem} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import {updateButtonStatus, dashboardToSession, updateRoomId, openModal, closeModal, sessionToDashboard, updatePrompt, updateCode} from '../actions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import io from 'socket.io-client';


class Navigation extends React.Component {
  constructor(props) {
    super(props);
    // this.startSession = this.startSession.bind(this);
  }

  openConnection() {
    this.socket = io.connect('http://127.0.0.1:3001');
    this.socket.on('connect', ()=>{

      this.socket.on('room id', (roomId) =>{
        this.props.updateRoomId(roomId);
      });
      this.socket.on('prompt', (prompt) =>{

        this.props.updatePrompt(prompt);
        this.props.updateCode(prompt.skeletonCode);
        // Trigger the navbar to Change
        this.props.updateButtonStatus();
        // Trigger route change

      });
      this.socket.on('edit', (code)=>{
        //TODO
      });
    });
  }

  // startSession() {
  //   // console.log("About to start a session");
  //   this.props.toggleView();
  //   //redirect to the homepage and open a model
  //   //this.props.handleOpenModal();
  // }
  
  render() {
    let buttonSet = null;

              // <LinkContainer to='/session'>
            // <Button bsStyle="info" onClick={this.startSession}>Start Session</Button>
          // </LinkContainer>
                    // <Button bsStyle="info" onClick={this.startSession}>Start Session</Button>
          // <Button bsStyle="info" onClick={this.startSession}>Start Session</Button>

    if (this.props.nav) {
      buttonSet = 
        <ButtonToolbar style={{marginTop: '7px', marginLeft: '15px'}}>
          <Button bsStyle="info" onClick={ () => {this.props.openModal(); this.openConnection() }}>Start Session</Button>
          <Button href="/logout">Log out</Button>
        </ButtonToolbar>;
    } else {
      buttonSet = 
        <ButtonToolbar style={{marginTop: '7px', marginLeft: '15px'}}>
          <Button>Swap Roles</Button>
          <LinkContainer to='/'>
            <Button bsStyle="info" onClick={() => {this.props.sessionToDashboard(); this.props.closeModal() }}>End Session</Button>
          </LinkContainer>
        </ButtonToolbar>;
    }

    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="/">Peared.io</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
            {buttonSet}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }

}

function mapStateToProps(state) {
  return {
    nav: state.nav
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({updateButtonStatus: updateButtonStatus, dashboardToSession: dashboardToSession, updateRoomId: updateRoomId, updateCode: updateCode, updatePrompt: updatePrompt, openModal: openModal, sessionToDashboard: sessionToDashboard, closeModal: closeModal}, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
