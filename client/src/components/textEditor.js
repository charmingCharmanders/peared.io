import React from 'react';
import ReactDOM from 'react-dom';
import Video from './video';
// import CodeMirror from 'codemirror/lib/codemirror';
import CodeMirror from 'react-codemirror';
import CodeMirrorJS from 'codemirror/mode/javascript/javascript';
// import CodeMirrorCSS from "codemirror/lib/codemirror.css";
import { LinkContainer } from 'react-router-bootstrap';
import js_beautify from 'js-beautify';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import {ButtonToolbar, Button, Navbar, CollapsibleNav, NavItem, NavDropdown, Nav, MenuItem, Grid, Col, Row} from 'react-bootstrap';

var dummyData = 'const addTwoNumbers = function(num1, num2) { \n// YOUR CODE HERE\n}';

class TextEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code: dummyData
    };
  }

  updateCode (newCode) {
    this.setState({
      code: js_beautify(newCode)
    });
  }

  render() {

    var convertToSoftTabs = function(cm) {
      if (cm.somethingSelected()) {
        cm.indentSelection();
      } else {
        var spaces = Array(cm.getOption('indentUnit') + 1).join(' ');
        cm.replaceSelection(spaces);
      }
    };

    var setSizing = function(cm) {
      if (cm.somethingSelected()) {
        cm.indentSelection();
      } else {
        var spaces = Array(cm.getOption('indentUnit') + 1).join(' ');
        cm.replaceSelection(spaces);
      }
    };

    var options = {
      lineNumbers: true,
      autofocus: true,
      extraKeys: {
        Tab: convertToSoftTabs
      },
      lineNumbers: true,
      mode: 'text/javascript',
      tabSize: 2,
      theme: 'material',
      indentUnit: 2,
      tabSize: 2,
      fixedGutter: false,
      coverGutterNextToScrollbar: true,
      setSize: {
        height: '70%'
      }
    };
    return (
      <CodeMirror value={js_beautify(this.state.code, {indent_size: 2})} onChange={this.updateCode} options={options} />           
    );
  }
}

export default TextEditor;
// <Video />




