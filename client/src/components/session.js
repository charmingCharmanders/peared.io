import React from 'react';
import ReactDOM from 'react-dom';
import Description from './description';
import TextEditorAndConsole from './textEditorAndConsole';
import {Grid, Col, Row} from 'react-bootstrap';

class Session extends React.Component {
  render() {
    return (
      <div className="session-container clearfix">
        <Description />
        <TextEditorAndConsole socketConnection={this.props.socketConnection}/>
      </div>
    );
  }
}

export default Session;
