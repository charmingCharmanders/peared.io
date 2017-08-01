import React from 'react';
import { Table } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class Leaderboard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Table bordered>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Rating</th>
          </tr>
        </thead>
        <tbody>
          {this.props.leaderboard.leaderArray ?
            this.props.leaderboard.leaderArray.map((leader, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{leader.name}</td>
                  <td>{Number(leader.rating).toFixed()}</td>
                </tr>
              );
            }) : null}
        </tbody>
      </Table>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    leaderboard: state.leaderboard
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Leaderboard);
