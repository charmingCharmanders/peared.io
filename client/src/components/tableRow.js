import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import {Table, ButtonToolbar, Button, Navbar, CollapsibleNav, NavItem, NavDropdown, Nav, MenuItem, Grid, Col, Row} from 'react-bootstrap';
import {openModal, updateCurrentQuestion} from '../actions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class TableRow extends React.Component {
  constructor(props) {
    super(props);
  }

  openQuestion() {
    this.props.updateCurrentQuestion(this.props.id - 1);
    this.props.openModal('displaySolution');
    // update the current question number as the value - 1
  }

  render() {
    return (
      <tr onClick={this.openQuestion.bind(this)}>
        <td>{this.props.id}</td>
        <td>{this.props.partner}</td>
        <td>{this.props.name}</td>
        <td>{this.props.time}</td>
        <td>{this.props.category}</td>
        <td>{this.props.rating}</td>
      </tr>
    );
  }
}

var mapStateToProps = function(state) { return {}; };

var mapDispatchToProps = function(dispatch) {
  return bindActionCreators({
    openModal: openModal,
    updateCurrentQuestion: updateCurrentQuestion
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(TableRow);
