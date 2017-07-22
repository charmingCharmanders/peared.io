import React from 'react';
import ReactDOM from 'react-dom';
import {Button} from 'react-bootstrap';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

class TextEditorButtons extends React.Component {
  constructor(props) {
    super(props);
  }

  minifyString(string) {
    return string.replace(/\s+/g, ' ');
  }

  codeTest() {
    this.props.socketConnection.emit('test', 1, this.minifyString(this.props.code), this.props.roomId);
  }

  render() {
    return (
      <div className="editor-buttons">
        <Button bsStyle="info" onClick={() => this.codeTest()}>Run</Button>
        <Button bsStyle="success">Submit</Button>
      </div>
    );
  }
}

var mapStateToProps = function (state) {
  return {
    code: state.code,
    prompt: state.prompt,
    roomId: state.roomId
  };
};

export default connect(mapStateToProps)(TextEditorButtons);
