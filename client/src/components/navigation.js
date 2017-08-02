import NavigationButtons from './navigationButtons';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Search from './search';
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
    const styles = {
      navbar: {
        background: '#fff',
        border: 0,
        padding: '5px 0'

      }
    };
    return (
      <Navbar fixedTop style={styles.navbar}>
          <Navbar.Brand>
            <a href="/">Peared.io</a>
          </Navbar.Brand>
          <Navbar.Text>{this.renderText()}</Navbar.Text>
          <NavigationButtons socket={this.props.socket} />
          <Search />
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
