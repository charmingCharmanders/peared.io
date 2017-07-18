import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {ButtonToolbar, Button, Navbar, CollapsibleNav, NavItem, NavDropdown, Nav, MenuItem} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.startSession = this.startSession.bind(this);
  }

  startSession() {
    console.log("About to start a session");
    this.props.handleOpenModal();
  }
  
  render() {
    let buttonSet = null;

    if (this.props.isDashboard) {
      buttonSet = 
        <ButtonToolbar style={{marginTop: '7px', marginLeft: '15px'}}>
          <Button bsStyle="info" onClick={this.startSession}>Start Session</Button>
          <Button href="/logout">Log out</Button>
        </ButtonToolbar>;
    } else {
      buttonSet = 
        <ButtonToolbar style={{marginTop: '7px', marginLeft: '15px'}}>
          <Button>Swap Roles</Button>
          <LinkContainer to='/'>
            <Button bsStyle="info" onClick={this.props.toggleView}>End Session</Button>
          </LinkContainer>
        </ButtonToolbar>;
    }

    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#">Peared.io</a>
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

export default Navigation;
