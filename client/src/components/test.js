import React from 'react';
import ReactDOM from 'react-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

class Test extends React.Component {
  constructor(props) {
    super(props);
    this.state= {
      hidden: "hidden"
    };
  }

  componentWillMount() {
    var that = this;
    setTimeout(function() {
      that.show();
    }, that.props.wait);
  }

  show(){
    this.setState({hidden : ""});
  }

  render() {
    let testNumber = this.props.index;
    let test = this.props.testResults.tests[testNumber];
    return (
      <div key={0} className={this.state.hidden}>
        <span className="testDescription">{test.description}</span>
        <br />
        <span className={test.result === 'test passed' ? 'testPass' : 'testFail'}>{test.result}</span>
      </div>
    );
  }
}

var mapStateToProps = function (state) {
  return {
    testResults: state.testResults
  };
};
  
export default connect(mapStateToProps)(Test);