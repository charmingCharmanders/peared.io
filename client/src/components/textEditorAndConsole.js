import ConsoleAndTest from './consoleAndTest';
import React from 'react';
import SplitPane from 'react-split-pane';
import TextEditor from './textEditor';
import Video from './video';

class TextEditorAndConsole extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="session-main">
        <SplitPane split="horizontal" defaultSize="75%" minSize={360}>
          <TextEditor code={this.props.code} socketConnection={this.props.socketConnection} />
          <ConsoleAndTest prompt={this.props.prompt} />
        </SplitPane>
        <Video roomId={this.props.roomId} />
      </div>
    );
  }
}

export default TextEditorAndConsole;
