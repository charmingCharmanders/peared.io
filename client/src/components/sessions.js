import React from 'react';
import SessionsEntry from './sessionsEntry';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Table } from 'react-bootstrap';

class Sessions extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Table bordered hover>
        <thead>
          <tr>
            <th>Partner</th>
            <th className="center">Prompt</th>
            <th className="center">Time</th>
            <th className="center">Category</th>
            <th className="center">Score</th>
          </tr>
        </thead>
        <tbody>
          {this.props.sessionData.sessionArray ?
            this.props.sessionData.sessionArray.map((row, index) => {
              return (
                <SessionsEntry
                  category={row.category}
                  id={index + 1}
                  key={index}
                  name={row.promptName}
                  partner={row.name}
                  rating={Number(row.rating).toFixed()}
                  time={row.lengthOfSession}
                />
              );
            }) : null}
        </tbody>
      </Table>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    sessionData: state.sessionData
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Sessions);
