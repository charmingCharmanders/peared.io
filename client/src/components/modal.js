import React from 'react';
import ReactDOM from 'react-dom';
import { closeModal, dashboardToSession, updateButtonStatus, updateCode, updatePrompt, updateRoomId } from '../actions';
import { Button, Modal } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class ModalComponent extends React.Component {
  constructor(props) {
    super(props);
    this.leaveSession = this.leaveSession.bind(this);
    this.switchToSession = this.switchToSession.bind(this);
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

  switchToSession() {
    this.props.closeModal();
    this.props.dashboardToSession();
  }

  renderModal() {
    if (this.props.modal.type === 'startSession') {
      return (
        <Modal show={this.props.modal.show} onHide={this.leaveSession}>
          <Modal.Header closeButton>
            <Modal.Title>Our servers are searching for a partner</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h5>Please be patient.</h5>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.leaveSession}>Close</Button>
            <LinkContainer to='/session'>
              <Button bsStyle='primary' disabled={this.props.buttonStatus} onClick={this.switchToSession}>Join Session!</Button>
            </LinkContainer>
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
    modal: state.modal
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
