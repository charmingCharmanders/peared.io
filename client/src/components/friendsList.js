import React from 'react';
import ReactDOM from 'react-dom';
import Header from './header';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import Axios from 'axios';
import {Badge, ListGroup, ListGroupItem, Panel, Table, ButtonToolbar, Button, Navbar,
CollapsibleNav, NavItem, NavDropdown, Nav, MenuItem, Grid, Col, Row} from 'react-bootstrap';

class FriendsList extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    Axios.get('/api/friends?profileId=1')
    .then(function (response) {
      response.data.forEach(friend => {
        console.log(`user friends from friendList.js ${friend.friend.firstName} ${friend.friend.lastName}, ranking: ${friend.friend.ranking}`)
      })
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render() {
    return (
      <Panel collapsible defaultExpanded header="Friends List">
        {friends.map((friend, index) => <ListGroupItem key={index} fill>{friend.name}<Badge>{friend.ranking}</Badge></ListGroupItem> )}
      </Panel>
    );
  }
}

export default FriendsList;
