import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import TableRow from './tableRow';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Form, FormControl, Panel, ListGroupItem, Badge, FormGroup, ControlLabel, Table, ButtonToolbar, Button, Navbar, CollapsibleNav, NavItem, NavDropdown, Nav, MenuItem, Grid, Col, Row} from 'react-bootstrap';
import {unfriend, addFriend, updateSearch} from '../actions';

class SearchProfiles extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.updateSearch(e.target.value);
  }

  add(userId, profileId, friendArray) {
    this.props.addFriend(userId, profileId, friendArray);
    document.getElementById('search').value = '';
  }

  removeFriend(userId, profileId, friendArray) {
    this.props.unfriend(userId, profileId, friendArray);
    document.getElementById('search').value = '';
  }

  render() {
    let userId = this.props.userProfileData.id;
    let friendArrayData = this.props.userFriendData;
    let friendArray;
    let results;

    if (this.props.userFriendData.friendArray) {
      friendArray = this.props.userFriendData.friendArray.map(friend => friend.friend.id);
    }

    if (!this.props.searchResults || document.getElementById('search').value === '') {
      results = '';
    } else {
      results =
        <Panel collapsible defaultExpanded header="Users">
          {this.props.searchResults.map((profile, index) => {

            let addButton =
              <Button bsStyle="primary" style={{float:"right", borderRadius: "5px", borderStyle: "none", color: "black", backgroundColor: "lightGreen"}}onClick={() => this.add(userId, profile.id, friendArrayData.friendArray)}>Add</Button>;

            let unfriendButton =
              <Button bsStyle="danger" style={{float:"right", borderRadius: "5px", borderStyle: "none", color: "black", backgroundColor: "lightRed", marginBottom: "5px"}}onClick={() => this.removeFriend(userId, profile.id, friendArrayData.friendArray)}>Unfriend</Button>;

            return (<ListGroupItem key={index} fill>{profile.name}{friendArray.includes(profile.id) ? unfriendButton : addButton}
            </ListGroupItem>);
          })}
        </Panel>;
    }

    return (
      <div>
        <form>
          <FormGroup controlId="search">
            <ControlLabel>Search For Friends</ControlLabel>
            <FormControl
              type="text"
              placeholder="Enter text"
              onChange={this.handleChange}
            />
            {results}
            <FormControl.Feedback />
          </FormGroup>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    searchResults: state.searchResults.searchArray,
    userFriendData: state.userFriendData,
    userProfileData:  state.userProfileData
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    updateSearch: updateSearch,
    addFriend: addFriend,
    unfriend: unfriend
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchProfiles);