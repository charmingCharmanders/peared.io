import React from 'react';
import ReactDOM from 'react-dom';
import { LinkContainer } from 'react-router-bootstrap';
import {Tabs, Tab} from 'react-bootstrap';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

class ConsoleAndTest extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="console">
        {this.props.testResults.map((test, index) => {
          return <div key={index}>{test.description} <br />{test.result}</div>;
        })
      }
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
