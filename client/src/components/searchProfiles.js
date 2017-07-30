import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import TableRow from './tableRow';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Form, FormControl, Panel, ListGroupItem, Badge, FormGroup, ControlLabel, Table, ButtonToolbar, Button, Navbar, CollapsibleNav, NavItem, NavDropdown, Nav, MenuItem, Grid, Col, Row} from 'react-bootstrap';
import {acceptOrUnfriend, addFriend, updateSearch} from '../actions';

class SearchProfiles extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  };

  handleChange(e) {
    this.props.updateSearch({ users: this.props.users.data.data, value: e.target.value});
  };

  render() {
    let userId = this.props.userProfileData.id;
    let friendArrayData = this.props.userFriendData;

    let friendArray;

    if (this.props.userFriendData.friendArray) {
      friendArray = this.props.userFriendData.friendArray.map(friend => friend.friend.id);
    }

    let results;
    if (!this.props.searchResults.searchResults || this.props.searchResults.searchResults.searchResults.length === this.props.users.data.data.length) { results = ''}
    else {
      results =
      <Panel collapsible defaultExpanded header="Users">
        {this.props.searchResults.searchResults.searchResults.map((profile, index) => {
          let addButton =
            <ButtonToolbar>
              <Button bsStyle="primary" onClick={() => this.props.addFriend.call(this, userId, profile.id, friendArrayData)}>Add</Button>
            </ButtonToolbar>;

          let unfriendButton =
            <ButtonToolbar>
              <Button bsStyle="danger" onClick={() => this.props.acceptOrUnfriend.call(this, userId, profile.id, friendArrayData)}>Unfriend</Button>
            </ButtonToolbar>;

          return (<div key={index}>
            <div key={index}>{profile.name}
            </div>
            {friendArray.includes(profile.id) ? unfriendButton : addButton}
          </div>)
        })}
      </Panel>
    };

    return (
      <div>
        <form>
          <FormGroup
            controlId="formBasicText"
          >
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
};

const mapStateToProps = (state) => {
  return {
    searchResults: state.searchResults,
    users: state.users,
    userFriendData: state.userFriendData,
    userProfileData:  state.userProfileData
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    updateSearch: updateSearch,
    addFriend: addFriend,
    acceptOrUnfriend: acceptOrUnfriend
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchProfiles);