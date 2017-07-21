import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {ButtonToolbar, Button, Navbar, CollapsibleNav, NavItem, NavDropdown, Nav, MenuItem} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import {dashboardToSession, openModal, closeModal, sessionToDashboard} from '../actions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

class Navigation extends React.Component {
  render() {
    let buttonSet = null;
    if (this.props.nav) {
      buttonSet = 
        <ButtonToolbar style={{marginTop: '7px', marginLeft: '15px'}}>
          <Button bsStyle="info" onClick={ () => {this.props.openModal(); this.props.openConnection();}}>Start Session</Button>
          <Button href="/logout">Log out</Button>
        </ButtonToolbar>;
    } else {
      buttonSet = 
        <ButtonToolbar style={{marginTop: '7px', marginLeft: '15px'}}>
          <Button>Swap Roles</Button>
          <LinkContainer to='/'>
            <Button bsStyle="info" onClick={() => {this.props.sessionToDashboard(); this.props.closeModal(); this.props.closeConnection();}}>End Session</Button>
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

var mapStateToProps = function(state) {
  return {
    nav: state.nav
  };
};

var mapDispatchToProps = function(dispatch) {
  return bindActionCreators(
    {
      dashboardToSession: dashboardToSession,
      openModal: openModal,
      sessionToDashboard: sessionToDashboard,
      closeModal: closeModal
    }, dispatch);
};


export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
