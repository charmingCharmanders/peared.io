import React from 'react';
import { Col, Grid, Row} from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class Leaderboard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <footer className="footer">
        <Grid>
          <Row>
            <Col md={12}>
              <p>&copy; 2017 peared.io</p>
            </Col>
          </Row>
        </Grid>
      </footer>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Leaderboard);
