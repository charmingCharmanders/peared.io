import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {ButtonToolbar, Button, Navbar, CollapsibleNav, NavItem, NavDropdown, Nav, MenuItem} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

class Navigation extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    let buttonSet = null;

    if (this.props.isDashboard) {
      buttonSet = 
        <ButtonToolbar style={{marginTop: '7px', marginLeft: '15px'}}>
          <LinkContainer to='/session'>
            <Button bsStyle="info" onClick={this.props.toggleView}>Start Session</Button>
          </LinkContainer>
          <Button href="/logout">Log out</Button>
        </ButtonToolbar>
    } else {
      buttonSet = 
        <ButtonToolbar style={{marginTop: '7px', marginLeft: '15px'}}>
          <Button>Swap Roles</Button>
          <LinkContainer to='/'>
            <Button bsStyle="info" onClick={this.props.toggleView}>End Session</Button>
          </LinkContainer>
        </ButtonToolbar>
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
    )
  }

}

export default Navigation;
