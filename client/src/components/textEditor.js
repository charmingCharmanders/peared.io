import React from 'react';
import ReactDOM from 'react-dom';
import Video from './video';
import CodeMirror from '@skidding/react-codemirror';
import { LinkContainer } from 'react-router-bootstrap';
import js_beautify from 'js-beautify';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import {ButtonToolbar, Button, Navbar, CollapsibleNav, NavItem, NavDropdown, Nav, MenuItem, Grid, Col, Row} from 'react-bootstrap';
import {updateCode} from '../actions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

class TextEditor extends React.Component {
  constructor(props) {
    super(props);
    this.codeChange = this.codeChange.bind(this);
  }

  codeChange(newCode) {
    console.log('this is the new code', newCode);
    this.props.updateCode(newCode);
    this.props.socketConnection.emit('edit', newCode, this.props.roomId);
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
        value={this.props.code}
        onChange={this.codeChange}
        options={options} />
    );
  }
}

var mapStateToProps = function (state) {
  return {
    code: state.code,
    roomId: state.roomId
  };
};

var mapDispatchToProps = function(dispatch) {
  return bindActionCreators({updateCode: updateCode}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(TextEditor);
