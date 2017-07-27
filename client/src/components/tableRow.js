import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import {Table, ButtonToolbar, Button, Navbar, CollapsibleNav, NavItem, NavDropdown, Nav, MenuItem, Grid, Col, Row} from 'react-bootstrap';

const TableRow = ({id, partner, name, time, category, rating}) => (
  <tr>
    <td>{id}</td>
    <td>{partner}</td>
    <td>{name}</td>
    <td>{time}</td>
    <td>{category}</td>
    <td>{rating}</td>
  </tr>
);

export default TableRow;