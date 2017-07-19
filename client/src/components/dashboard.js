import React from 'react';
import ReactDOM from 'react-dom';
import Header from './header';
import HistoryTable from './historyTable';
import FriendsList from './friendsList';
import Stats from './stats';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import {Table, ButtonToolbar, Button, Navbar, CollapsibleNav, NavItem, NavDropdown, Nav, MenuItem, Grid, Col, Row} from 'react-bootstrap';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Grid>      
          <Row className='show-grid'>
            <Col md={12} ><h6>Dashboard</h6></Col>
          </Row>
          <Row className='show-grid'>
            <Col md={12}><h2>Welcome, Charmander!</h2></Col>
          </Row>
          <br />
          <Row className='show-grid'>
            <Col md={9}><HistoryTable /></Col>
            <Col md={3}><FriendsList /></Col>
          </Row>
          <Stats />
        </Grid>
      </div>
    );
  }
}

export default Dashboard;
