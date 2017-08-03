import React from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

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
            <div key={index}>
              <span className="testDescription">
                <span className="arrow">&gt;</span>
                {test.description}
              </span>
              <br />
              <span className={test.result === 'test passed' ? 'testPass' : 'testFail'}>
                <span className="arrow">&gt;</span>
                {test.result}
              </span>
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

const mapStateToProps = function (state) {
  return {
    testResults: state.testResults
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ConsoleAndTest);
