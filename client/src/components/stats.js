import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import {Panel, Table, ButtonToolbar, Button, Navbar, CollapsibleNav, NavItem, NavDropdown, Nav, MenuItem, Grid, Col, Row} from 'react-bootstrap';
import {selectUser} from '../actions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

class Stats extends React.Component {
  render() {
    let ranking;

    if (this.props.userProfileData.rating < 100) {ranking = 'Novice'}
    else if (this.props.userProfileData.rating < 5000) {ranking = 'Amateur'}
    else if (this.props.userProfileData.rating < 20000) {ranking = 'Professional'}
    else {ranking = 'Expert'}

    return (
      <Row className='show-grid'>
        <Col md={3} xs={4}>
          <Panel header="Total Solved" bsStyle="primary">
            <p>{this.props.sessionData.sessionArray ? this.props.sessionData.sessionArray.length : ''}</p>
          </Panel>
        </Col>
        <Col md={3} xs={4}>
          <Panel header="Completion Rate" bsStyle="info">
            {this.props.sessionData.sessionArray ? (this.props.sessionData.sessionArray.filter(session => session.lengthOfSession).length/this.props.sessionData.sessionArray.length * 100).toString() + '%' : ''}
          </Panel>
        </Col>
        <Col md={3} xs={4}>
          <Panel header="Ranking" bsStyle="info">
            {ranking}
          </Panel>
        </Col>
      </Row>
    )
  }
}

function mapStateToProps(store) {
  return {
    users: store.users,
    sessionData: store.sessionData,
    userProfileData:  store.userProfileData
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({selectUser: selectUser}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Stats);

