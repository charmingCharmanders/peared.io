import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';


class View extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <h2>On the View Component</h2>
        <ul>
          <li><Link to='/roster'>Go to /Roster</Link></li>
        </ul>
      </div>
    )
  }
}

export default View;
