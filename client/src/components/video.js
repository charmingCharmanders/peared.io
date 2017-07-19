import React from 'react';
import ReactDOM from 'react-dom';
import { LinkContainer } from 'react-router-bootstrap';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import {ButtonToolbar, Button, Navbar, CollapsibleNav, NavItem, NavDropdown, Nav, MenuItem, Grid, Col, Row} from 'react-bootstrap';

class Video extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={{float: 'right', margin: '70px', width: '230px', height: '180px', backgroundColor: 'yellow'}}></div>
    );
  }
}

export default Video;