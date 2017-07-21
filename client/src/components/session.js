import React from 'react';
import ReactDOM from 'react-dom';
import Description from './description';
import TextEditorAndConsole from './textEditorAndConsole';
import {Grid, Col, Row} from 'react-bootstrap';

class Session extends React.Component {
  render() {
    return (
      <Grid fluid>
        <Row className='show-grid'>
          <Col md={3}><Description /></Col>
          <TextEditorAndConsole socketConnection={this.props.socketConnection}/>
        </Row>
      </Grid>
    );
  }
}

export default Session;





