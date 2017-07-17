import React from 'react';
import ReactDOM from 'react-dom';
import { LinkContainer } from 'react-router-bootstrap';
// import Console from './console';
// import Test from './test';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import {Tabs, Tab, ButtonToolbar, Button, Navbar, CollapsibleNav, NavItem, NavDropdown, Nav, MenuItem, Grid, Col, Row} from 'react-bootstrap';

class ConsoleAndTest extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Tabs defaultActiveKey={1} animation={true} id="noanim-tab-example">
        <Tab eventKey={1} title="Console" style={{padding: '20px'}}>HIHIHI</Tab>
      </Tabs>
    );
  }
}

export default ConsoleAndTest;