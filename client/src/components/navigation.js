import NavigationButtons from './navigationButtons';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Navbar } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class Navigation extends React.Component {
  constructor(props) {
    super(props);
  }

  renderText() {
    if (this.props.nav) {
      return `${this.props.onlineUsers} users currently online`;
    }
    return `${this.props.currentTime}`;
  }

  render() {
    return (
      <Navbar>
          <Navbar.Brand>
            <a href="/">Peared.io</a>
          </Navbar.Brand>
          <Navbar.Text>{this.renderText()}</Navbar.Text>
          <NavigationButtons socket={this.props.socket} />
      </Navbar>
    );
  }
}

const mapStateToProps = function(state) {
  return {
    currentTime: state.currentTime,
    nav: state.nav,
    onlineUsers: state.onlineUsers
  };
};

const mapDispatchToProps = function(dispatch) {
  return bindActionCreators(
    {}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
