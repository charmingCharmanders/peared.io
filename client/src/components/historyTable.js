import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import TableRow from './tableRow';
import {Table, ButtonToolbar, Button, Navbar, CollapsibleNav, NavItem, NavDropdown, Nav, MenuItem, Grid, Col, Row} from 'react-bootstrap';

let dummyData = [
  {
    partner: 'Pikachu',
    name: 'Fibonacci',
    time: '5:15',
    category: 'Recursion'
  },
  {
    partner: 'Bulbasaur',
    name: 'Clock',
    time: '5:15',
    category: 'Binary Search Tree'
  },
  {
    partner: 'Squirtle',
    name: 'Spiral Array',
    time: '5:15',
    category: 'React'
  },
  {
    partner: 'Charmander',
    name: 'Fibonacci',
    time: '5:15',
    category: 'Angular'
  },
  {
    partner: 'Charmeleon',
    name: 'For Loop',
    time: '5:15',
    category: 'Backbone'
  },
  {
    partner: 'Charizard',
    name: 'Tree Node',
    time: '5:15',
    category: 'jQuery'
  },
];

class HistoryTable extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let index = 0;

    return (
        <Table responsive bordered condensed hover striped>
          <thead>
            <tr>
              <th>#</th>
              <th>Partner</th>
              <th>Toy Problem</th>
              <th>Time</th>
              <th>Category</th>
            </tr>
          </thead>
          <tbody>
            {dummyData.map(row => {
              index++;
              return <TableRow id={index} partner={row.partner} name={row.name} time={row.time} category={row.category} />;
            })}
          </tbody>
        </Table>
    )
  }
}

export default HistoryTable;
