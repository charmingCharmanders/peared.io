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
import {connect} from 'react-redux';

class Session extends React.Component {
  constructor(props) {
    super(props);
    this.emitEdits = this.emitEdits.bind(this);
    this.state = {
      prompt: {
        description: '',
        name: '',
        hints: '',
      },
      code: ''
    };
  }

  openConnection() {
    // console.log('opening a connection');
    this.socket = io.connect('http://127.0.0.1:3001');
    // socket.connect('http://127.0.0.1:3001');
    // this.socket.emit('start session', true);
    this.socket.on('connect', ()=>{
      // console.log('we connected to the socket server');
      this.socket.on('room id', (roomId) =>{
        // console.log('recieving a roomId');
        this.setState({
          roomId: roomId
        });
      });
      this.socket.on('prompt', (prompt) =>{
        // console.log('recieving a prompt');
        // this.handleCloseModal();
        // console.log(JSON.parse(prompt).skeletonCode);
        this.setState({
          prompt: JSON.parse(prompt),
          code: JSON.parse(prompt).skeletonCode
        });
      });
      this.socket.on('edit', (code)=>{
        //TODO
      });
    });
  }

  emitEdits(code, roomId) {
    this.socket.emit('edit', (code, roomId) =>{
      //TODO
    });
  }

  componentDidMount() {
    // this.handleOpenModal();
    this.openConnection();
  }

  render() {
    return (
      <Grid fluid>
        <Row className='show-grid'>
          <Col md={3}><Description prompt={this.state.prompt}/></Col>
          <TextEditorAndConsole emitEdits={this.emitEdits} code={this.state.code}/>
        </Row>
      </Grid>
    );
  }
}

function mapStateToProps(state) {
  return {
    modal: state.modal
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Session);





