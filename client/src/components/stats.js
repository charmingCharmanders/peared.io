import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import {Panel, Table, ButtonToolbar, Button, Navbar, CollapsibleNav, NavItem, NavDropdown, Nav, MenuItem, Grid, Col, Row} from 'react-bootstrap';
import {selectUser} from '../actions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

// console.log(this.props);

class Stats extends React.Component {
  render() {
    return (
      <Row className='show-grid'>
        <Col md={3} xs={4}>
          <Panel header="Total Solved" bsStyle="primary">
            <p onClick={() => this.props.selectUser()} >Click me!</p>
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
  }
}

function mapStateToProps(store) {
  return {
    users: store.users
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({selectUser: selectUser}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Stats);

