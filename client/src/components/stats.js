import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import {Panel, Table, ButtonToolbar, Button, Navbar, CollapsibleNav, NavItem, NavDropdown, Nav, MenuItem, Grid, Col, Row} from 'react-bootstrap';

const Stats = () => (
  <Row className='show-grid'>
    <Col md={3} xs={4}>
      <Panel header="Total Solved" bsStyle="primary">
        6
      </Panel>
    </Col>
    <Col md={3} xs={4}>
      <Panel header="Completion Rate" bsStyle="info">
        50%
      </Panel>
    </Col>
    <Col md={3} xs={4}>
      <Panel header="Ranking" bsStyle="info">
        Jedi Master
      </Panel>
    </Col>
  </Row>
)

export default Stats;
