import React from 'react';
import ReactDOM from 'react-dom';
import { LinkContainer } from 'react-router-bootstrap';
import {Tabs, Tab} from 'react-bootstrap';

var tests = {}
class ConsoleAndTest extends React.Component {
  render() {
    return (
      <Tabs defaultActiveKey={1} animation={true} id="noanim-tab-example">
        <Tab eventKey={1} title="Output" style={{padding: '20px'}}>The Test Output Will Go Here.</Tab>
      </Tabs>
    );
  }
}

export default ConsoleAndTest;