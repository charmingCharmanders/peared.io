import React from 'react';
import ReactDOM from 'react-dom';
import { LinkContainer } from 'react-router-bootstrap';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import {ButtonToolbar, Button, Navbar, CollapsibleNav, NavItem, NavDropdown, Nav, MenuItem, Grid, Col, Row} from 'react-bootstrap';

class Video extends React.Component {
  constructor(props) {
    super(props);
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
      <div className="video-container">
        {this.renderIframe()}
      </div>
    );
  }
}

export default Video;
