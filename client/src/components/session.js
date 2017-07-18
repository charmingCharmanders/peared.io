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

class Session extends React.Component {
  constructor(props) {
    super(props);
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.state = {};
  }

  handleOpenModal () {
    this.setState({ showModal: true });
  }

  handleCloseModal () {
    this.setState({ showModal: false });
  }
  startSession() {
    console.log("starting a session");
    var socket = io.connect('http://127.0.0.1:3001');
    // socket.connect('http://127.0.0.1:3001');
    // this.socket.emit('start session', true);
    socket.on('connect', ()=>{
      console.log('we connected to the socket server');
    })
    // socket.on('session started', (roomId) => {
    //   console.log('lets play: ', roomId);
    //   this.handleCloseModal();
    //   //Update the state, and close the modal.
    // });
  }

  componentDidMount() {
    this.handleOpenModal();
    this.startSession();
  }

  render() {
    return (
      <Grid fluid>
        <Row className='show-grid'>
          <Col md={3}><Description /></Col>
          <TextEditorAndConsole />
        </Row>
        <ReactModal
            isOpen={this.state.showModal}
            contentLabel="Inline Styles Modal Example"
            style={{
              overlay: {
                zIndex: 1000,
                backgroundColor: 'papayawhip'
              },
              content: {
                color: 'lightsteelblue'
              }
            }}
          >
            <p>Our servers our currently trying to Pair You!</p>
            <p>Please be Patient...</p>
            <button>This button does nothing! Lol.</button>
          </ReactModal>
      </Grid>
    );
  }
}

export default Session;