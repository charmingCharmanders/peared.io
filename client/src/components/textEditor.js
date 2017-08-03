import CodeMirror from '@skidding/react-codemirror';
import CodeMirrorJS from 'codemirror/mode/javascript/javascript';
import React from 'react';
import TextEditorButtons from './textEditorButtons';
import Video from './video';
import jsBeautify from 'js-beautify';
import { LinkContainer } from 'react-router-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { updateCode } from '../actions';

class TextEditor extends React.Component {
  constructor(props) {
    super(props);
    this.codeChange = this.codeChange.bind(this);
  }

  codeChange(newCode) {
    this.props.updateCode(newCode);
    this.props.socketConnection.emit('edit', newCode, this.props.roomId);
  }

  convertToSoftTabs(cm) {
    if (cm.somethingSelected()) {
      cm.indentSelection();
    } else {
      var spaces = Array(cm.getOption('indentUnit') + 1).join(' ');
      cm.replaceSelection(spaces);
    }
  }

  render() {
    const jsBeautifyOptions = {
      indent_size: 2,
      wrap_line_length: 60
    };

    const codeMirrorOptions = {
      lineNumbers: true,
      extraKeys: {
        Tab: this.convertToSoftTabs
      },
      mode: 'text/javascript',
      tabSize: 2,
      theme: 'material'
    };

    return (
      <div className="editor-container">
        <CodeMirror
          defaultValue={jsBeautify(this.props.code, jsBeautifyOptions)}
          onChange={this.codeChange}
          options={codeMirrorOptions}
          value={this.props.code}
        />
        <TextEditorButtons socketConnection={this.props.socketConnection} />
      </div>
    );

  }
}

const mapStateToProps = function (state) {
  return {
    code: state.code,
    roomId: state.roomId
  };
};

const mapDispatchToProps = function(dispatch) {
  return bindActionCreators({
    updateCode: updateCode
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(TextEditor);
