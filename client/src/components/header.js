import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {ButtonToolbar, Button, Navbar, CollapsibleNav, NavItem, NavDropdown, Nav, MenuItem} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import {BrowserRouter as Router, browserHistory, Switch, Route, Link} from 'react-router-dom';



class Header extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#">Peared.io</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <NavItem eventKey={1} href="#">About</NavItem>
            <NavDropdown eventKey={2} title="Features" id="basic-nav-dropdown">
              <MenuItem eventKey={2.1}>Friends List</MenuItem>
              <MenuItem eventKey={2.2}>Achievements</MenuItem>
              <MenuItem eventKey={2.3}>I love you</MenuItem>
              <MenuItem divider />
              <MenuItem eventKey={2.4}>Invite</MenuItem>
            </NavDropdown>
          </Nav>
          <Nav pullRight>
            <ButtonToolbar style={{marginTop: '7px', marginLeft: '15px'}}>
              <LinkContainer to='/session'>
                <Button bsStyle="info">Start Session</Button>
              </LinkContainer>
              <Button>Log out</Button>
            </ButtonToolbar>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Header;
