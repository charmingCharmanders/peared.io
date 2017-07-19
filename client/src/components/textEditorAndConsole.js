import React from 'react';
import ReactDOM from 'react-dom';
import { LinkContainer } from 'react-router-bootstrap';
import TextEditor from './textEditor';
import ConsoleAndTest from './consoleAndTest';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import {ButtonToolbar, Button, Navbar, CollapsibleNav, NavItem, NavDropdown, Nav, MenuItem, Grid, Col, Row} from 'react-bootstrap';

class TextEditorAndConsole extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Col md={9}>
        <div style={{height: '100%'}}>
          <TextEditor code={this.props.code}/>
          <ConsoleAndTest prompt={this.props.prompt}/>
        </div>
      </Col>
    );
  }
}


export default TextEditorAndConsole;