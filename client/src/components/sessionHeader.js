import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {ButtonToolbar, Button, Navbar, CollapsibleNav, NavItem, NavDropdown, Nav, MenuItem} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

class sessionHeader extends React.Component {
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
          <Nav pullRight>
            <ButtonToolbar style={{marginTop: '7px', marginLeft: '15px'}}>
              <Button>Swap Roles</Button>
              <LinkContainer to='/'>
                <Button bsStyle="info">End Session</Button>
              </LinkContainer>
            </ButtonToolbar>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }

}

export default sessionHeader;
