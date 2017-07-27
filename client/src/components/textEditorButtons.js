import React from 'react';
import ReactDOM from 'react-dom';
import {Button} from 'react-bootstrap';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {endSession} from '../actions';

class TextEditorButtons extends React.Component {
  
  minifyString(string) {
    return string.replace(/\s+/g, ' ');
  }

  codeSubmit() {
    this.props.endSession(this.props.sessionData, this.props.currentSession, this.props.code, this.props.testResults);
  }

  codeTest() {
    this.props.socketConnection.emit('test', this.props.promptId, this.props.code, this.props.roomId);
  }

  render() {
    return (
      <div className="editor-buttons">
        <Button bsStyle="info" onClick={() => this.codeTest()}>Run</Button>
        <Button bsStyle="success" onClick={() => this.codeSubmit()}>Submit</Button>
      </div>
    );
  }
}

var mapStateToProps = function (state) {
  return {
    code: state.code,
    currentSession: state.currentSession,
    promptId: state.prompt.id,
    roomId: state.roomId,
    sessionData: state.sessionData.sessionArray,
    testResults: state.testResults
  };
};

var mapDispatchToProps = function (dispatch) {
  return bindActionCreators({
    endSession: endSession
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(TextEditorButtons);
