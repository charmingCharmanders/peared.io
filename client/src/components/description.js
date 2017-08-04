import React from 'react';
import { Button, Panel } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class Description extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  renderArrow() {
    return this.state.open ? 'Hide Hint' : 'Show Hint';
  }

  togglePanel() {
    this.setState({
      open: !this.state.open
    });
  }

  render() {
    return (
      <div className="session-description">
        <h3>{this.props.prompt.name}</h3>
        <p>{this.props.prompt.description}</p>
        <h4 onClick={() => this.togglePanel()}>{this.renderArrow()}</h4>
        <Panel collapsible expanded={this.state.open}>
          {this.props.prompt.hint}
        </Panel>
      </div>
    );
  }
}

const mapStateToProps = function(state) {
  return {
    prompt: state.prompt
  };
};

const mapDispatchToProps = function(dispatch) {
  return bindActionCreators({}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Description);
