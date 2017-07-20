import React from 'react';
import ReactDOM from 'react-dom';
import Header from './header';
import { LinkContainer } from 'react-router-bootstrap';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import {Tabs, Tab, ButtonToolbar, Button, Navbar, CollapsibleNav, NavItem, NavDropdown, Nav, MenuItem, Grid, Col, Row} from 'react-bootstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

let question = {
  question: 'asyncMap has two parameters, an array of asynchronous functions (tasks) and a callback. Each of the tasks takes a separate callback and invokes that callback when complete. The callback passed to asyncMap is then performed on the results of the callbacks of the tasks. The order of these results should be the same as the order of the tasks. It is important to note that this is not the order in which the tasks return, but the order in which they are passed to asyncMap.',
  hints: 'Once all the callbacks of the tasks are returned, asyncMap should invoke the callback on the results array.',
  tests: ['asyncMap(1)', 'asyncMap(2)', 'asyncMap(3)']
};

class Description extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Tabs defaultActiveKey={1} animation={true} id="noanim-tab-example">
        <Tab eventKey={1} title="Question" style={{padding: '20px'}}>{this.props.prompt.description}</Tab>
        <Tab eventKey={2} title="Hint" style={{padding: '20px'}}>{this.props.prompt.hint}</Tab>
      </Tabs>
    );
  }
}

function mapStateToProps(state) {
  return {
    prompt: state.prompt
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Description);
