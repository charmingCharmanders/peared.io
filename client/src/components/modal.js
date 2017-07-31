import React from 'react';
import ReactDOM from 'react-dom';
import { closeModal, dashboardToSession, updateButtonStatus, updateCode, updatePrompt, updateRoomId } from '../actions';
import { Button, Modal } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Countdown from './countdown';

class ModalComponent extends React.Component {
  constructor(props) {
    super(props);
    this.leaveSession = this.leaveSession.bind(this);
  }

  closeModal() {
    this.props.closeModal();
  }

  leaveSession() {
    this.props.closeModal();
    this.props.updateButtonStatus(true);
    this.props.updateCode(null);
    this.props.updatePrompt(null);
    this.props.updateRoomId(null);
    this.props.socket.emit('leave room');
  }

  renderModal() {
    if (this.props.modal.type === 'startSession') {
      return (
        <Modal show={this.props.modal.show} onHide={this.leaveSession}>
          <Modal.Header closeButton>
            <Modal.Title>Our servers are searching for a partner</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {
              this.props.buttonStatus ?
                (<h5>Please be patient.</h5>) :
                (<Countdown />)
            }
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.leaveSession}>Close</Button>
          </Modal.Footer>
        </Modal>
      );
    }
    if (this.props.modal.type === 'endSession') {
      return (
        <Modal show={this.props.modal.show} onHide={this.closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>The session has been ended</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h5>The session has been ended.</h5>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.closeModal}>Close</Button>
          </Modal.Footer>
        </Modal>
      );
    }
    if (this.props.modal.type === 'submitSession') {
      return (
        <Modal show={this.props.modal.show} onHide={this.closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>Your code has been submitted</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h5>Here is a summary of your performance.</h5>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.leaveSession}>Close</Button>
          </Modal.Footer>
        </Modal>
      );
    }
    if (this.props.modal.type === 'displaySolution') {
      return (
        <Modal show={this.props.modal.show} onHide={this.props.closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>{this.props.sessionData.sessionArray[this.props.currentQuestion].promptName}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>{this.props.sessionData.sessionArray[this.props.currentQuestion].lengthOfSession}</h4>
            <h5>{this.props.sessionData.sessionArray[this.props.currentQuestion].solution}</h5>
          </Modal.Body>
          <Modal.Footer>
            <h5>{this.props.sessionData.sessionArray[this.props.currentQuestion].numberOfTestsPassed} /
                {this.props.sessionData.sessionArray[this.props.currentQuestion].numberOfTests}
            </h5>
          </Modal.Footer>
        </Modal>
      );
    }
  }

  render() {
    return (
      <div>{this.renderModal()}</div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    buttonStatus: state.buttonStatus,
    currentQuestion: state.currentQuestion,
    modal: state.modal,
    sessionData: state.sessionData
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      closeModal: closeModal,
      dashboardToSession: dashboardToSession,
      updateButtonStatus: updateButtonStatus,
      updateCode: updateCode,
      updatePrompt: updatePrompt,
      updateRoomId: updateRoomId
    },
    dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalComponent);
