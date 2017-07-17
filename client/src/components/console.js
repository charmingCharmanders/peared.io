import React from 'react';
import ReactDOM from 'react-dom';
import { LinkContainer } from 'react-router-bootstrap';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import {Tabs, Tab, ButtonToolbar, Button, Navbar, CollapsibleNav, NavItem, NavDropdown, Nav, MenuItem, Grid, Col, Row} from 'react-bootstrap';

class Console extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>Console</div>
    );
  }
}

export default Console;