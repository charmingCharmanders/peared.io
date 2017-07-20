import React from 'react';
import ReactDOM from 'react-dom';
import Video from './video';
import CodeMirror from 'react-codemirror';
import { LinkContainer } from 'react-router-bootstrap';
import js_beautify from 'js-beautify';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import {ButtonToolbar, Button, Navbar, CollapsibleNav, NavItem, NavDropdown, Nav, MenuItem, Grid, Col, Row} from 'react-bootstrap';

class TextEditor extends React.Component {
  constructor(props) {
    super(props);
    this.updateCode = this.updateCode.bind(this);
    this.state = {
      text: ''
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      text: nextProps.code
    });
  }

  updateCode(newCode) {
    this.props.emitEdits(newCode);
  }

  convertToSoftTabs (cm) {
    if (cm.somethingSelected()) {
      cm.indentSelection();
    } else {
      var spaces = Array(cm.getOption('indentUnit') + 1).join(' ');
      cm.replaceSelection(spaces);
    }
  }

  render() {
    var options = {
      autofocus: true,
      coverGutterNextToScrollbar: true,
      extraKeys: {
        Tab: this.convertToSoftTabs
      },
      fixedGutter: false,
      indentUnit: 2,
      lineNumbers: true,
      mode: 'text/javascript',
      setSize: {
        height: '70%'
      },
      tabSize: 2,
      theme: 'material'
    };
    return ( 
      <CodeMirror 
        value={this.state.text}
        onChange={this.updateCode}
        options={options} />
    );
  }
}

export default TextEditor;
