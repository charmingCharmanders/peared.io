import React from 'react';
import ReactDOM from 'react-dom';
import Video from './video';
import CodeMirror from 'react-codemirror';
import { LinkContainer } from 'react-router-bootstrap';
import js_beautify from 'js-beautify';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import {ButtonToolbar, Button, Navbar, CollapsibleNav, NavItem, NavDropdown, Nav, MenuItem, Grid, Col, Row} from 'react-bootstrap';

var dummyData = 'const addTwoNumbers = function(num1, num2) { \n// YOUR CODE HERE\n}';

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
    // this.setState({
    //   text: newCode
    // });
    this.props.emitEdits(newCode);
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
      mode: 'text/javascript',
      theme: 'material'
    };

    // var options = {
    //   lineNumbers: true,
    //   autofocus: true,
    //   extraKeys: {
    //     Tab: convertToSoftTabs
    //   },
    //   mode: 'text/javascript',
    //   tabSize: 2,
    //   theme: 'material',
    //   indentUnit: 2,
    //   fixedGutter: false,
    //   coverGutterNextToScrollbar: true,
    //   setSize: {
    //     height: '70%'
    //   }
    // };
    return (
      <CodeMirror 
        value={this.state.text}
        onChange={this.updateCode}
        options={options} />           
    );
  }
}

export default TextEditor;




