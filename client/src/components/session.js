import React from 'react';
import ReactDOM from 'react-dom';
import Header from './header';
import { LinkContainer } from 'react-router-bootstrap';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import Description from './description';
import TextEditorAndConsole from './textEditorAndConsole';
import {ButtonToolbar, Button, Navbar, CollapsibleNav, NavItem, NavDropdown, Nav, MenuItem, Grid, Col, Row} from 'react-bootstrap';

class Session extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Grid fluid>
        <Row className='show-grid'>
          <Col md={3}><Description /></Col>
          <TextEditorAndConsole />
        </Row>
      </Grid>
    );
  }
}

export default Session;