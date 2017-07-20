import React from 'react';
import ReactDOM from 'react-dom';
import HistoryTable from './historyTable';
import FriendsList from './friendsList';
import Stats from './stats';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import {Modal, Table, ButtonToolbar, Button, Navbar, CollapsibleNav, NavItem, NavDropdown, Nav, MenuItem, Grid, Col, Row} from 'react-bootstrap';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {closeModal, dashboardToSession} from '../actions';
import {LinkContainer} from 'react-router-bootstrap';
import io from 'socket.io-client';
import Axios from 'axios';

class Dashboard extends React.Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    Axios.get('api/sessions')
    .then(function (response) {
      let userSessions1 = response.data.filter((entry) => {
        return entry.profileId1 === 1;
      })
      let userSessions2 = response.data.filter((entry) => {
        return entry.profileId2 === 1;
      })
      console.log(userSessions1);
      console.log(userSessions2);
    })
    .catch(function (error) {
      console.log(error);
    });
  }


  render() {
    let modal =
      <Modal show={this.props.modal} onHide={ () => this.props.closeModal() }>
        <Modal.Header closeButton>
          <Modal.Title>Our servers are searching for a partner!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>Please be Patient...</h5>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => this.props.closeModal()}>Close</Button>
          <LinkContainer to='/session'>
            <Button bsStyle='primary' disabled={this.props.buttonStatus} onClick={() => this.props.dashboardToSession()}>Join Session!</Button>
          </LinkContainer>
        </Modal.Footer>
      </Modal>;

    return (
      <div>
        <Grid>
          <Row className='show-grid'>
            <Col md={12} ><h6>Dashboard</h6></Col>
          </Row>
          <Row className='show-grid'>
            <Col md={12}><h2>Welcome, Charmander!</h2></Col>
          </Row>
          {modal}
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

const mapStateToProps = (state) => {
  return {
    modal: state.modal,
    buttonStatus: state.buttonStatus
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({closeModal: closeModal, dashboardToSession: dashboardToSession}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

