import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { openModal, updateCurrentQuestion } from '../actions';

class SessionsEntry extends React.Component {
  constructor(props) {
    super(props);
    this.displaySolution = this.displaySolution.bind(this);
  }

  displaySolution() {
    this.props.openModal('displaySolution');
    this.props.updateCurrentQuestion(this.props.id - 1);
  }

  render() {
    return (
      <tr onClick={this.displaySolution}>
        <td>{this.props.partner}</td>
        <td>{this.props.name}</td>
        <td>{this.props.time}</td>
        <td>{this.props.category}</td>
        <td>{this.props.rating}</td>
      </tr>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    openModal: openModal,
    updateCurrentQuestion: updateCurrentQuestion
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(SessionsEntry);
