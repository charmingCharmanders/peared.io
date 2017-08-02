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
import TextEditorButtons from './textEditorButtons';
require('codemirror/mode/javascript/javascript');

class TextEditor extends React.Component {
  constructor(props) {
    super(props);
    this.codeChange = this.codeChange.bind(this);
  }

  codeChange(newCode) {
    this.props.updateCode(newCode);
    this.props.socketConnection.emit('edit', newCode, this.props.roomId);
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
 
    var options = {
      lineNumbers: true,
      extraKeys: {
        Tab: convertToSoftTabs
      },
      mode: 'text/javascript',
      tabSize: 2,
      theme: 'material'
    };

    return (
      <div className="editor-container">
        <CodeMirror 
          value={js_beautify(this.props.code)}
          onChange={this.codeChange}
          options={options} 
        />
        <TextEditorButtons socketConnection={this.props.socketConnection} />
      </div>
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
