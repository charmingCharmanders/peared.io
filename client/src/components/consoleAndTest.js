import React from 'react';
import ReactDOM from 'react-dom';
import { LinkContainer } from 'react-router-bootstrap';
import {Tabs, Tab} from 'react-bootstrap';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

class ConsoleAndTest extends React.Component {
  
  render() {
    return (
      <div className="console">
        {this.props.testResults.map((test, index) => {
          return (
            <div key={index}>
              <span className="testDescription">{test.description}</span>
              <br />
              <span className="passedTests">{test.result}</span>
            </div>
          );
        })}
      </div>
    );
  }
}

var mapStateToProps = function (state) {
  return {
    testResults: state.testResults
  };
};

export default connect(mapStateToProps)(ConsoleAndTest);
