import React from 'react';
import ReactDOM from 'react-dom';
import Header from './header';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import Axios from 'axios';
import {Badge, ListGroup, ListGroupItem, Panel, Table, ButtonToolbar, Button, Navbar,
CollapsibleNav, NavItem, NavDropdown, Nav, MenuItem, Grid, Col, Row} from 'react-bootstrap';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

class FriendsList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log('props inside friends list', this.props);
    return (
      <Panel collapsible defaultExpanded header="Friends List">
        {this.props.userFriendData.friendArray ? this.props.userFriendData.friendArray.map((friend, index) => <ListGroupItem key={index} fill>{friend.friend.firstName}<Badge>{friend.status === 'pending' ? friend.status : ''}</Badge></ListGroupItem> ) : ''}
      </Panel>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userFriendData:  state.userFriendData,
    userProfileData:  state.userProfileData
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(FriendsList);
