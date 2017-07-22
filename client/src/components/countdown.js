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

  renderIframe() {
    const hostname = window.location.hostname;
    if (hostname === '127.0.0.1' || hostname === 'localhost') {
      return <iframe src={`https://tokbox.com/embed/embed/ot-embed.js?embedId=f9ef23c6-1579-4b77-9f1f-8380c10fcbc0&room=${this.props.roomId}&iframe=true`} width='360' height='240'></iframe>;
    } else {
      return <iframe src={`https://tokbox.com/embed/embed/ot-embed.js?embedId=4808bf20-edc1-4fdd-8d6c-358c7c73c64a&room=${this.props.roomId}&iframe=true`} width='360' height='240'></iframe>;
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
