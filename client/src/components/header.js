import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Navbar, NavItem, NavDropdown, Nav, MenuItem} from 'react-bootstrap';

class Header extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Navbar>

        <Navbar.Header pullLeft>
          <Navbar.Brand>
            <a href="#">Paired.io</a>
          </Navbar.Brand>

        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
            <NavItem eventKey={1} href="#">New Session</NavItem>
            <NavItem eventKey={2} href="#">LogOut</NavItem>
          </Nav>
        </Navbar.Collapse>
        
        
      </Navbar>
    )
  }
}

export default Header;
