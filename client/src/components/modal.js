import React from 'react';
import ReactDOM from 'react-dom';
import { closeModal, dashboardToSession, updateButtonStatus, updateCode, updatePrompt, updateRoomId } from '../actions';
import { Button, Modal } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Countdown from './countdown';
import CodeMirror from '@skidding/react-codemirror';

class ModalComponent extends React.Component {
  constructor(props) {
    super(props);
    this.leaveSession = this.leaveSession.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.acceptRequestToPair = this.acceptRequestToPair.bind(this);
    this.rejectRequestToPair = this.rejectRequestToPair.bind(this);
  }

  closeModal() {
    this.props.closeModal();
  }

  acceptRequestToPair() {
    this.props.socket.emit('approve session request', this.props.roomId);
  }
  rejectRequestToPair() {
    this.props.closeModal();
    this.props.socket.emit('reject session request', this.props.roomId);
  }

  leaveSession() {
    this.props.closeModal();
    this.props.updateButtonStatus(true);
    this.props.updateCode(null);
    this.props.updatePrompt(null);
    this.props.updateRoomId(null);
    if(this.props.partnerData) {
      this.props.socket.emit('cancel session request', this.props.partnerData.id);
    }
    this.props.socket.emit('leave room');
  }

  renderModal() {
    const convertToSoftTabs = function(cm) {
      if (cm.somethingSelected()) {
        cm.indentSelection();
      } else {
        var spaces = Array(cm.getOption('indentUnit') + 1).join(' ');
        cm.replaceSelection(spaces);
      }
    };

    let options = {
      readOnly: true,
      lineNumbers: true,
      extraKeys: {
        Tab: convertToSoftTabs
      },
      mode: 'text/javascript',
      tabSize: 2,
      theme: 'material'
    };

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
    if (this.props.modal.type === 'sendingRoomRequest') {
      return (
        <Modal show={this.props.modal.show} onHide={this.leaveSession}>
          <Modal.Header closeButton>
            <Modal.Title>Currently waiting on {this.props.partnerData.firstName} {this.props.partnerData.lastName} to Accept</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {
              this.props.buttonStatus ?
                (<h5>Please be patient.</h5>) :
                (<Countdown />)
            }
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.leaveSession}>Cancel Request</Button>
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
    if (this.props.modal.type === 'receivingRoomRequest') {
      return (
        <Modal show={this.props.modal.show} onHide={this.rejectRequestToPair}>
          <Modal.Header closeButton>
            <Modal.Title>{this.props.partnerData.firstName} {this.props.partnerData.lastName} sent you a pairing request</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {
              this.props.buttonStatus ?
                (<h5>Would you like to join?</h5>) :
                (<Countdown />)
            }
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.acceptRequestToPair}>Accept</Button>
            <Button onClick={this.rejectRequestToPair}>Reject</Button>
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
            <Button onClick={this.closeModal}>Close</Button>
          </Modal.Footer>
        </Modal>
      );
    }
    if (this.props.modal.type === 'displaySolution') {
      return (
        <Modal show={this.props.modal.show} onHide={this.props.closeModal}>
          <Modal.Header closeButton>
            <div className='clearfix'>
              <Modal.Title style={{float:'left'}}>{this.props.sessionData.sessionArray[this.props.currentQuestion].promptName}</Modal.Title>
              <Modal.Title style={{float:'right', marginRight:20}}>Time Elapsed: {this.props.sessionData.sessionArray[this.props.currentQuestion].lengthOfSession}</Modal.Title>
            </div>
          </Modal.Header>
          <Modal.Body>
            <div className="editor-container" id='toyProblemSkeletonCode'>
              <CodeMirror
                value={this.props.sessionData.sessionArray[this.props.currentQuestion].solution}
                options={options} 
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button style={{float:'right'}} onClick={this.closeModal}>Close</Button>
            <h5 style={{float:'right', marginRight:20}}>Tests Passed: {this.props.sessionData.sessionArray[this.props.currentQuestion].numberOfTestsPassed}/
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
    roomId: state.roomId,
    partnerData: state.partnerData,
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
