import React from 'react';
import { Button, FormControl, FormGroup, ListGroupItem, Panel } from 'react-bootstrap';
import { addFriend, unfriend, updateSearch } from '../actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  add(userId, profileId, friendArray) {
    this.props.addFriend(userId, profileId, friendArray);
    document.getElementById('search').value = '';
  }

  handleChange(e) {
    this.props.updateSearch(e.target.value);
  }

  removeFriend(userId, profileId, friendArray) {
    this.props.unfriend(userId, profileId, friendArray);
    document.getElementById('search').value = '';
  }

  render() {
    let friendArrayData = this.props.userFriendData;
    let friendArray, results;
    let userId = this.props.userProfileData.id;

    const styles = {
      button: {
        float: 'right'
      }
    };

    if (this.props.userFriendData.friendArray) {
      friendArray = this.props.userFriendData.friendArray.map(friend => friend.friend.id);
    }

    if (!this.props.searchResults || document.getElementById('search').value === '') {
      results = '';
    } else {
      results =
        <Panel>
          {this.props.searchResults.map((profile, index) => {
            let addButton =
              <Button bsSize="xsmall" bsStyle="success" style={styles.button} onClick={() => this.add(userId, profile.id, friendArrayData.friendArray)}>Add</Button>;
            let unfriendButton =
              <Button bsSize="xsmall" bsStyle="danger" style={styles.button} onClick={() => this.removeFriend(userId, profile.id, friendArrayData.friendArray)}>Unfriend</Button>;
            return (
              <ListGroupItem key={index} fill>
                {profile.name} {friendArray.includes(profile.id) ? unfriendButton : addButton}
              </ListGroupItem>
            );
          })}
        </Panel>;
    }

    return (
      <FormGroup className="navbar-search" controlId="search">
        <FormControl
          onChange={this.handleChange}
          placeholder="search for friends"
          type="text"
        />
        {results}
        <FormControl.Feedback />
      </FormGroup>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    searchResults: state.searchResults.searchArray,
    userFriendData: state.userFriendData,
    userProfileData: state.userProfileData
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    addFriend: addFriend,
    unfriend: unfriend,
    updateSearch: updateSearch
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
