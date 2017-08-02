import React from 'react';
import { Col, Panel, Row} from 'react-bootstrap';
import { bindActionCreators} from 'redux';
import { connect} from 'react-redux';

class Statistics extends React.Component {
  renderRanking(rating) {
    if (rating < 100) {
      return 'Novice';
    }
    if (rating < 5000) {
      return 'Amateur';
    }
    if (rating < 20000) {
      return 'Professional';
    }
    return 'Expert';
  }

  render() {
    return (
      <Row>
        <Col md={2}>
          <Panel header="Ranking" bsStyle="info">
            {this.renderRanking(this.props.userProfileData.rating)}
          </Panel>
        </Col>
        <Col md={2}>
          <Panel header="Completed" bsStyle="info">
            {this.props.sessionData.sessionArray ? this.props.sessionData.sessionArray.length : null}
          </Panel>
        </Col>
        <Col md={2}>
          <Panel header="Statistic" bsStyle="info">
            0
          </Panel>
        </Col>
        <Col md={2}>
          <Panel header="Statistic" bsStyle="info">
            0
          </Panel>
        </Col>
        <Col md={2}>
          <Panel header="Statistic" bsStyle="info">
            0
          </Panel>
        </Col>
        <Col md={2}>
          <Panel header="Statistic" bsStyle="info">
            0
          </Panel>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = (store) => {
  return {
    sessionData: store.sessionData,
    userProfileData: store.userProfileData
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Statistics);
