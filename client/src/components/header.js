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
    )
  }
            // <Button type="button" className="btn btn-default navbar-btn">Log out</Button>

      //   <Nav pullRight>
      // <ButtonToolBar>
      //   <Button bsStyle="primary">Primary</Button>
      //   <Button bsStyle="success">Success</Button>
      // </ButtonToolBar>
      // </Nav>
}
// <Nav pullRight>
//     <Button bsStyle="info">Start Session</Button>
//     <Button>Logout</Button>
// </Nav>

export default Header;

// <NavItem eventKey={1} href="#"><Button bsStyle="info">Start Session</Button></NavItem>
            // <NavItem eventKey={2} href="#"><Button>Logout</Button></NavItem>

// <Navbar inverse collapseOnSelect>
  // <Navbar.Header>
  //   <Navbar.Brand>
      // <a href="/">Peared.io</a>
    // </Navbar.Brand>
    // <Navbar.Toggle />
  // </Navbar.Header>
  // <Navbar.Collapse>

    // <Nav pullRight>
        // <NavItem eventKey={1} href="#">Start Session</NavItem>
        // <NavItem eventKey={2} >Log Out</NavItem>
    // </Nav>
  // </Navbar.Collapse>
// </Navbar>

// <Nav>
//   <NavItem eventKey={1} href="#">Link</NavItem>
//   <NavItem eventKey={2} href="#">Link</NavItem>
//   <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
//     <MenuItem eventKey={3.1}>Action</MenuItem>
//     <MenuItem eventKey={3.2}>Another action</MenuItem>
//     <MenuItem eventKey={3.3}>Something else here</MenuItem>
//     <MenuItem divider />
//     <MenuItem eventKey={3.3}>Separated link</MenuItem>
//   </NavDropdown>
// </Nav>



      // <Navbar>

      //   <Navbar.Header pullLeft>
      //     <Navbar.Brand>
      //       <a href="#">Paired.io</a>
      //     </Navbar.Brand>

      //   </Navbar.Header>
      //   <Navbar.Collapse>
      //     <Nav pullRight>
      //       <NavItem eventKey={1} href="#">New Session</NavItem>
      //       <NavItem eventKey={2} href="#">LogOut</NavItem>
      //     </Nav>
      //   </Navbar.Collapse>
        
        
      // </Navbar>
