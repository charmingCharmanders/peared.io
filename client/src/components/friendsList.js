import React from 'react';
import ReactDOM from 'react-dom';
import Header from './header';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import {Badge, ListGroup, ListGroupItem, Panel, Table, ButtonToolbar, Button, Navbar,
  CollapsibleNav, NavItem, NavDropdown, Nav, MenuItem, Grid, Col, Row} from 'react-bootstrap';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {updatePartnerData, acceptFriend, openModal} from '../actions';

class FriendsList extends React.Component {
  constructor(props) {
    super(props);
    this.requestSession = this.requestSession.bind(this);
  }

  requestSession(friend) {
    console.log('friendData:', friend);
    this.props.updatePartnerData({firstName: friend.firstName, lastName: friend.lastName, id: friend.id});
    this.props.openModal('sendingRoomRequest');
    this.props.socket.emit('request session', friend);
  }

  render() {
    let userId;
    let acceptButton;
    let startSessionButton;
    let pendingFlag;
    let dot;

    this.props.userProfileData ? userId = this.props.userProfileData.id : userId = '';

    return (
      <Panel collapsible defaultExpanded header="Friends List">
        {this.props.userFriendData.friendArray ? this.props.userFriendData.friendArray.map((friend, index) => {
          if (friend.online) {
            dot = <h3 style={{float: "left", height: "12px", width: "12px", backgroundColor: "lightGreen", borderRadius: "6px", margin: "4px 5px 0px 0px"}}></h3>;
          } else {
            dot = <h3 style={{float: "left", height: "12px", width: "12px", backgroundColor: "lightGrey", borderRadius: "6px", margin: "4px 5px 0px 0px"}}></h3>;
          }
          if (friend.status === 'pending') {
            startSessionButton = '';
            pendingFlag = <button style={{float:"right", borderRadius: "5px", borderStyle: "none", backgroundColor: "lightGrey", margin: "0px 5px 0px 5px"}}>Pending</button>;

            if (friend.updatedBy !== this.props.userProfileData.id) {
              acceptButton = <button style={{float:"right", borderRadius: "5px", borderStyle: "none", backgroundColor: "lightBlue", margin: "0px 5px 0px 5px"}} onClick={() => this.props.acceptFriend(friend.friend.id, userId)}>Accept</button>;
            } else {
              acceptButton = '';
            }
          } else if (friend.inRoom === false && friend.online === true) {
            pendingFlag = '';
            acceptButton = '';
            startSessionButton = <button style={{float:"right", borderRadius: "5px", borderStyle: "none", backgroundColor: "lightGreen", margin: "0px 5px 0px 5px"}} onClick={() => this.requestSession(friend.friend)}>Code</button>;
          } else {
            startSessionButton = '';
            acceptButton = '';
            pendingFlag = '';
          }
          return (<ListGroupItem key={index} fill>{dot}{friend.friend.firstName}{acceptButton}{startSessionButton}{pendingFlag}</ListGroupItem>)}) : ''
        }
      </Panel>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userFriendData: state.userFriendData,
    userProfileData: state.userProfileData
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    updatePartnerData: updatePartnerData,
    openModal: openModal,
    acceptFriend: acceptFriend
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(FriendsList);
