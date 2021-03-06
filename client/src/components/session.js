import React from 'react';
import ReactDOM from 'react-dom';
import Description from './description';
import TextEditorAndConsole from './textEditorAndConsole';
import {Grid, Col, Row} from 'react-bootstrap';
import {incrementCurrentTime, setCurrentTimeToZero} from '../actions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class Session extends React.Component {

  componentDidMount() {
    this.props.setCurrentTimeToZero();
    this.incrementTime = setInterval(
      ()=>{ this.props.incrementCurrentTime(this.props.currentTime); }, 1000
    );
  }
  componentWillUnmount() {
    clearInterval(this.incrementTime);
  }

  render() {
    return (
      <div className="session-container clearfix">
        <Description />
        <TextEditorAndConsole socketConnection={this.props.socketConnection}/>
      </div>
    );
  }
}

var mapStateToProps = function(state) {
  return {
    currentTime: state.currentTime
  };
};

var mapDispatchToProps = function(dispatch) {
  return bindActionCreators(
    {
      incrementCurrentTime: incrementCurrentTime,
      setCurrentTimeToZero: setCurrentTimeToZero
    }, dispatch);
};


export default connect(mapStateToProps, mapDispatchToProps)(Session);