import React from 'react';
import ReactDOM from 'react-dom';
import Test from './test.js';
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
          <div>
            <span className="arrow">&gt;</span>
            {testResults.error}
          </div>
        </div>
      );
    }

    return (
      <div className="testContainer">
        {testResults.tests.map((test, index) => {
          return (
            <Test index={index} wait={(index+1)*900}></Test>
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

const mapStateToProps = function (state) {
  return {
    testResults: state.testResults
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ConsoleAndTest);
