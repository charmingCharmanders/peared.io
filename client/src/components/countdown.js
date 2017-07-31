import React from 'react';
import { closeModal, dashboardToSession } from '../actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class Countdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentCount: null
    };
    this.switchToSession = this.switchToSession.bind(this);
    this.timer = this.timer.bind(this);
  }

  componentDidMount() {
    this.setState({
      currentCount: 5
    });
    this.intervalId = setInterval(this.timer, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  switchToSession() {
    this.props.closeModal();
    this.props.dashboardToSession();
  }

  timer(start) {
    this.setState({
      currentCount: this.state.currentCount - 1
    });
    if (this.state.currentCount < 1) { 
      this.switchToSession();
    }
  }

  render() {
    return (
      this.state.currentCount ?
      <h5>Session will begin in {this.state.currentCount}</h5> : null
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      closeModal: closeModal,
      dashboardToSession: dashboardToSession
    },
    dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Countdown);
