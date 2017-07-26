import React from 'react';
import ReactDOM from 'react-dom';
import { LinkContainer } from 'react-router-bootstrap';
import {Tabs, Tab} from 'react-bootstrap';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

class ConsoleAndTest extends React.Component {
  
  renderTestResults() {
    const testResults = this.props.testResults;
    if (testResults.error) {
      return (
        <div className="testContainer">
          <div>{testResults.error}</div>
        </div>
      );
    }
    return (
      <div className="testContainer">
        {testResults.tests.map((test, index) => {
          return (
            <div key={index}>
              <span className="testDescription">{test.description}</span>
              <br />
              <span className={test.result === 'test passed' ? 'testPass' : 'testFail'}>{test.result}</span>
            </div>
          );
        })}
      </div>
    );
  }

  render() {
    return (
      <div className="console">
        {this.renderTestResults()}
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
