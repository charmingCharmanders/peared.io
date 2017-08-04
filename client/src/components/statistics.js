import React from 'react';
import { Col, Panel, Row} from 'react-bootstrap';
import { bindActionCreators} from 'redux';
import { connect} from 'react-redux';

class Statistics extends React.Component {

  renderSessionsCompleted(sessionArray) {
    var sessionsCompleted = 0;

    for (let i = 0; i < sessionArray.length; i++) {
      if (sessionArray[i].numberOfTests === sessionArray[i].numberOfTestsPassed) {
        sessionsCompleted++;
      }
    }

    return sessionsCompleted;
  }

  renderTotalTime(sessionsArray) {
    let minutes = 0;
    let seconds = 0;
    let hours = 0;

    for (let i = 0; i < sessionsArray.length; i++) {
      let time = sessionsArray[i].lengthOfSession.split(':');
      minutes += parseInt(time[0]);
      seconds += parseInt(time[1]);
    }

    minutes += Math.floor(seconds / 60);
    seconds = ((seconds / 60) - Math.floor(seconds / 60)) * 60;

    hours = Math.floor(minutes / 60);
    minutes = ((minutes / 60) - Math.floor(minutes / 60)) * 60;

    return `${Math.round(hours)}h : ${Math.round(minutes)}m : ${Math.round(seconds)}s`;

  }

  renderAverageScore(sessionsArray) {
    let averageScore = 0;

    for (let i = 0; i < sessionsArray.length; i++) {
      averageScore += parseInt(sessionsArray[i].rating);
    }

    return Math.round(averageScore / sessionsArray.length);
  }

  render() {
    return (
      <Row>
        <Col xs={2}>
          <Panel header="Rating" bsStyle="info">
            {Math.round(this.props.userProfileData.rating)}
          </Panel>
        </Col>
        <Col xs={2}>
          <Panel header="Sessions Completed" bsStyle="info">
            {this.props.sessionData.sessionArray ?
              this.renderSessionsCompleted(this.props.sessionData.sessionArray) :
              ('loading...')
            }
          </Panel>
        </Col>
        <Col xs={2}>
          <Panel header="Number of Friends" bsStyle="info">
            {this.props.userFriendData.friendArray ?
              (this.props.userFriendData.friendArray.length) :
              ('loading...')
            }
          </Panel>
        </Col>
        <Col xs={2}>
          <Panel header="Total Time" bsStyle="info">
            {this.props.sessionData.sessionArray ?
              this.renderTotalTime(this.props.sessionData.sessionArray) :
              ('loading...')
            }
          </Panel>
        </Col>
        <Col xs={2}>
          <Panel header="# of Prompts Added" bsStyle="info">
            {this.props.userToyProblems.length}
          </Panel>
        </Col>
        <Col xs={2}>
          <Panel header="Average Score" bsStyle="info">
            {this.props.sessionData.sessionArray ?
              this.renderAverageScore(this.props.sessionData.sessionArray) :
              ('loading....')
            }
          </Panel>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = (store) => {
  return {
    sessionData: store.sessionData,
    userProfileData: store.userProfileData,
    userFriendData: store.userFriendData,
    userToyProblems: store.userToyProblems
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Statistics);
