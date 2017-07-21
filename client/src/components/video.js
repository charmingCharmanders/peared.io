import React from 'react';
import ReactDOM from 'react-dom';
import { LinkContainer } from 'react-router-bootstrap';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import {ButtonToolbar, Button, Navbar, CollapsibleNav, NavItem, NavDropdown, Nav, MenuItem, Grid, Col, Row} from 'react-bootstrap';

class Video extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="video-container">
        <iframe src={`https://tokbox.com/embed/embed/ot-embed.js?embedId=f9ef23c6-1579-4b77-9f1f-8380c10fcbc0&room=${this.props.roomId}&iframe=true`} width='360' height='240' >
        </iframe>
      </div>
    );
  }
}

export default Video;