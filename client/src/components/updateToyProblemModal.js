import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { setInitialSkeletonCode, setInitialSolutionCode, addTest, deleteToyProblem, setNewSkeletonCode, setNewSolutionCode, updateSkeletonCode, updateSolutionCode, updateToyProblemTests, postUserToyProblem, setCurrentUserToyProblem, updateUserToyProblem, toggleUpdateUserToyProblemModal, toggleNewUserToyProblemModal} from '../actions';
import {form, FieldGroup, Modal, Table, ButtonToolbar, Button, Navbar, CollapsibleNav, NavItem, NavDropdown, Nav, MenuItem, Grid, Col, Row} from 'react-bootstrap';
import CodeMirror from '@skidding/react-codemirror';
// var js_beautify = require('js-beautify');
require('codemirror/mode/javascript/javascript');

class UpdateToyProblemModal extends React.Component {

  constructor(props) {
    super(props);
    this.onSkeletonCodeChange = this.onSkeletonCodeChange.bind(this);
    this.onSolutionCodeChange = this.onSolutionCodeChange.bind(this);
  }

  onSkeletonCodeChange(newCode) {
    this.props.updateSkeletonCode(newCode);
  }

  onSolutionCodeChange(newCode) {
    this.props.updateSolutionCode(newCode);
  }

  render() {
    const convertToSoftTabs = function(cm) {
      if (cm.somethingSelected()) {
        cm.indentSelection();
      } else {
        var spaces = Array(cm.getOption('indentUnit') + 1).join(' ');
        cm.replaceSelection(spaces);
      }
    };
 
    let options = {
      lineNumbers: true,
      extraKeys: {
        Tab: convertToSoftTabs
      },
      mode: 'text/javascript',
      tabSize: 2,
      theme: 'material'
    };

    return (
      <Modal show={this.props.updateUserToyProblemModal} onHide={ () => this.props.toggleUpdateUserToyProblemModal(false) }>
        <Modal.Header closeButton>
          <Modal.Title>Update This Toy Problem!</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <Row className="show-grid">
            <Col md={12}>
              <h5>Name</h5>
              <input 
                id="toyProblemName" 
                type="text" 
                name="Name" 
                defaultValue={this.props.currentUserToyProblem.name} 
                style={{width: '50%'}} 
              />
            </Col>
          </Row>

          <Row className="show-grid">
            <Col md={12}>
              <h5>Description</h5>
              <input 
                id="toyProblemDescription" 
                type="text" 
                name="Description" 
                defaultValue={this.props.currentUserToyProblem.description} 
                style={{width: '100%'}} 
              />
            </Col>
          </Row>

          <Row className="show-grid">
            <Col md={12}>
              <h5>Hint</h5>
              <input 
                id="toyProblemHint" 
                type="text" 
                name="Hint" 
                defaultValue={this.props.currentUserToyProblem.hint} 
                style={{width: '100%'}} 
              />
            </Col>
          </Row>

          <Row className="show-grid">
            <Col md={6}>
              <h5>Category</h5>
              <input 
                id="toyProblemCategory" 
                type="text" 
                name="Category" 
                defaultValue={this.props.currentUserToyProblem.category} 
                style={{width: '100%'}}
              />
            </Col>
            <Col md={6}>
              <h5>Difficulty</h5>
              <input 
                id="toyProblemDifficulty" 
                type="text" 
                name="Difficulty"
                defaultValue={this.props.currentUserToyProblem.difficulty} 
                style={{width: '100%'}}
              />
            </Col>
          </Row>

          <Row className="show-grid">
            <Col md={12}>
              <h5>Skeleton Code</h5>
              <div className="editor-container" id='toyProblemSkeletonCode'>
                <CodeMirror
                  value={this.props.currentUserToyProblem.skeletonCode}
                  onChange={this.onSkeletonCodeChange}
                  options={options} 
                />
              </div>
            </Col>
          </Row>

          <Row className="show-grid">
            <Col md={12}>
              <h5>Solution Code</h5>
              <div className="editor-container" id='toyProblemSolutionCode'>
                <CodeMirror 
                  value={this.props.currentUserToyProblem.solutionCode}
                  onChange={this.onSolutionCodeChange}
                  options={options} 
                />
              </div>
            </Col>
          </Row>

          <hr />
          <h4>Tests</h4>

          { this.props.currentUserToyProblem.description ?
            this.props.currentUserToyProblem.tests.map((test, index) => (
              <div key={index}>
                <Row className="show-grid">
                  <Col md={12}>
                    <h5>Description</h5>
                    <input 
                      id={`testDescription${index}`} 
                      type="text" 
                      name="testDescription" 
                      defaultValue={test.description} 
                      style={{width: '100%'}} 
                    />
                  </Col>
                </Row>
                <Row className="show-grid">
                  <Col md={6}>
                    <h5>Arguments</h5>
                    <input 
                      id={`testArguments${index}`} 
                      type="text" 
                      name="testArguments" 
                      defaultValue={test.arguments} 
                      style={{width: '100%'}}
                    />
                  </Col>
                  <Col md={6}>
                    <h5>Output</h5>
                    <input 
                      id={`testOutput${index}`} 
                      type="text" 
                      name="testOutput"
                      defaultValue={test.expectedOutput} 
                      style={{width: '100%'}}
                    />
                  </Col>
                </Row>
                <br />
              </div>
            ))
            : ('Loading')
          }

          <Row className="show-grid">
            <Col md={6}>
              <Button 
                bsStyle="info" 
                bsSize="xsmall"
                onClick = { () => this.props.addTest(this.props.currentUserToyProblem.id) }
              >+ Test
              </Button>
            </Col>
          </Row>

        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => this.props.toggleUpdateUserToyProblemModal(false) }>Close</Button>
          <Button bsStyle='primary' onClick={() => {
            var today = new Date();
            today = today.getMonth() + 1 + '/' + today.getDate() + '/' + today.getFullYear();

            let newName = document.getElementById('toyProblemName').value;
            let newDescription = document.getElementById('toyProblemDescription').value;
            let newCategory = document.getElementById('toyProblemCategory').value;
            let newDifficulty = document.getElementById('toyProblemDifficulty').value;
            let newHint = document.getElementById('toyProblemHint').value;

            let toy = this.props.currentUserToyProblem;
            let testArray = [];

            this.props.updateUserToyProblem({
              id: toy.id,
              name: newName, 
              description: newDescription, 
              category: newCategory, 
              difficulty: newDifficulty, 
              updatedAt: today,
              hint: newHint,
              skeletonCode: this.props.skeletonCode,
              solutionCode: this.props.solutionCode
            });

            for (let i = 0; i < toy.tests.length; i++) {
              let obj = {};
              obj.promptId = toy.id;
              obj.id = toy.tests[i].id;
              obj.description = document.getElementById(`testDescription${i}`).value;
              obj.arguments = document.getElementById(`testArguments${i}`).value;
              obj.expectedOutput = document.getElementById(`testOutput${i}`).value;
              testArray.push(obj);
            }

            this.props.updateToyProblemTests(testArray);
            this.props.toggleUpdateUserToyProblemModal(false);

          }}>Update</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    userToyProblems: state.userToyProblems,
    updateUserToyProblemModal: state.updateUserToyProblemModal,
    newUserToyProblemModal: state.newUserToyProblemModal,
    currentUserToyProblem: state.currentUserToyProblem,
    userProfileData: state.userProfileData,
    skeletonCode: state.skeletonCode,
    solutionCode: state.solutionCode,
    newSkeletonCode: state.newSkeletonCode,
    newSolutionCode: state.newSolutionCode
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    updateUserToyProblem: updateUserToyProblem, 
    toggleNewUserToyProblemModal: toggleNewUserToyProblemModal,
    toggleUpdateUserToyProblemModal: toggleUpdateUserToyProblemModal,
    setCurrentUserToyProblem: setCurrentUserToyProblem,
    postUserToyProblem: postUserToyProblem,
    updateToyProblemTests: updateToyProblemTests,
    updateSkeletonCode: updateSkeletonCode,
    updateSolutionCode: updateSolutionCode,
    setNewSkeletonCode: setNewSkeletonCode,
    setNewSolutionCode: setNewSolutionCode,
    deleteToyProblem: deleteToyProblem,
    setInitialSkeletonCode: setInitialSkeletonCode,
    setInitialSolutionCode: setInitialSolutionCode,
    addTest: addTest
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateToyProblemModal);