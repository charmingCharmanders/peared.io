import React from 'react';
import ReactDOM from 'react-dom';
import { LinkContainer } from 'react-router-bootstrap';
import TextEditor from './textEditor';
import Video from './video';
import ConsoleAndTest from './consoleAndTest';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import {ButtonToolbar, Button, Navbar, CollapsibleNav, NavItem, NavDropdown, Nav, MenuItem, Grid, Col, Row} from 'react-bootstrap';
import SplitPane from 'react-split-pane';

class TextEditorAndConsole extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="session-main">
        <SplitPane split="horizontal" defaultSize="75%" minSize={285}>
          <TextEditor code={this.props.code} socketConnection={this.props.socketConnection} />
          <ConsoleAndTest prompt={this.props.prompt} />
        </SplitPane>
        <Video roomId={this.props.roomId} />
      </div>
    );
  }
}

export default TextEditorAndConsole;
