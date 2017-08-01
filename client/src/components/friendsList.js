import React from 'react';
import ReactDOM from 'react-dom';
import Header from './header';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import {Badge, ListGroup, ListGroupItem, Panel, Table, ButtonToolbar, Button, Navbar,
  CollapsibleNav, NavItem, NavDropdown, Nav, MenuItem, Grid, Col, Row} from 'react-bootstrap';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {acceptFriend} from '../actions';

class FriendsList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let userId;
    let acceptButton;
    let startSessionButton;
    let pendingFlag;

    this.props.userProfileData ? userId = this.props.userProfileData.id : userId = '';

    return (
      <Panel collapsible defaultExpanded header="Friends List">
        {this.props.friendsList ? this.props.friendsList.map((friend, index) => {
          if (friend.status === 'pending') {
            startSessionButton = '';
            pendingFlag = <button style={{float:"right", borderRadius: "5px", borderStyle: "none", backgroundColor: "lightGrey", margin: "0px 5px 0px 5px"}}>Pending</button>;

            if (friend.updatedBy !== this.props.userProfileData.id) {
              acceptButton = <button style={{float:"right", borderRadius: "5px", borderStyle: "none", backgroundColor: "lightBlue", margin: "0px 5px 0px 5px"}} onClick={() => this.props.acceptFriend(friend.friend.id, userId)}>Accept</button>;
            } else {
              acceptButton = '';
            }
          } else {
            pendingFlag = '';
            acceptButton = '';
            startSessionButton = <button style={{float:"right", borderRadius: "5px", borderStyle: "none", backgroundColor: "lightGreen", margin: "0px 5px 0px 5px"}}>Code</button>;
          }
          return (<ListGroupItem key={index} fill>{friend.friend.firstName}{acceptButton}{startSessionButton}{pendingFlag}</ListGroupItem>)}) : ''
        }
      </Panel>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    friendsList: state.friendsList,
    userProfileData: state.userProfileData
  };
};


const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    acceptFriend: acceptFriend
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(FriendsList);
