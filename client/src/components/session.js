import React from 'react';
import ReactDOM from 'react-dom';
import Header from './header';
import { LinkContainer } from 'react-router-bootstrap';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import Description from './description';
import ReactModal from 'react-modal';
import io from 'socket.io-client';
import TextEditorAndConsole from './textEditorAndConsole';
import {ButtonToolbar, Button, Navbar, CollapsibleNav, NavItem, NavDropdown, Nav, MenuItem, Grid, Col, Row} from 'react-bootstrap';
import {openModal, closeModal} from '../actions';
import {bindActionCreators} from 'redux';

class Session extends React.Component {
  constructor(props) {
    super(props);
    this.emitEdits = this.emitEdits.bind(this);
  }


  emitEdits(code) {
    console.log('emmitting an edit');
    // var roomId = this.state.roomId;
    // this.socket.emit('edit', code, this.state.roomId);
  }

  render() {
    return (
      <Grid fluid>
        <Row className='show-grid'>
          <Col md={3}><Description /></Col>
          <TextEditorAndConsole emitEdits={this.emitEdits}/>
        </Row>
      </Grid>
    );
  }
}

export default Session;





