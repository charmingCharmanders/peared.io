import React from 'react';
import ReactDOM from 'react-dom';
import Header from './header';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import {Badge, ListGroup, ListGroupItem, Panel, Table, ButtonToolbar, Button, Navbar, CollapsibleNav, NavItem, NavDropdown, Nav, MenuItem, Grid, Col, Row} from 'react-bootstrap';

let friends = [
  {
    name: 'David',
    ranking: '1'
  },
  {
    name: 'Jeff',
    ranking: '2'
  },
  {
    name: 'Daniel',
    ranking: '44'
  },
  {
    name: 'Wes',
    ranking: '12'
  }
];

class FriendsList extends React.Component {
  constructor(props) {
    super(props);
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
