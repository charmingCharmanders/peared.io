import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { setNewSkeletonCode, setNewSolutionCode, updateSkeletonCode, updateSolutionCode, updateToyProblemTests, postUserToyProblem, setCurrentUserToyProblem, updateUserToyProblem, toggleUpdateUserToyProblemModal, toggleNewUserToyProblemModal} from '../actions'
import {form, FieldGroup, Modal, Table, ButtonToolbar, Button, Navbar, CollapsibleNav, NavItem, NavDropdown, Nav, MenuItem, Grid, Col, Row} from 'react-bootstrap';
import CodeMirror from '@skidding/react-codemirror';
// var js_beautify = require('js-beautify');
require('codemirror/mode/javascript/javascript');

class YourToyProblems extends React.Component {

  constructor(props) {
    super(props);
    this.onSkeletonCodeChange = this.onSkeletonCodeChange.bind(this);
    this.onSolutionCodeChange = this.onSolutionCodeChange.bind(this);
    this.onNewSkeletonCodeChange = this.onNewSkeletonCodeChange.bind(this);
    this.onNewSolutionCodeChange = this.onNewSolutionCodeChange.bind(this);
  }

  onSkeletonCodeChange(newCode) {
    this.props.updateSkeletonCode(newCode);
  }

  onSolutionCodeChange(newCode) {
    this.props.updateSolutionCode(newCode);
  }

  onNewSkeletonCodeChange(newCode) {
    this.props.setNewSkeletonCode(newCode);
  }

  onNewSolutionCodeChange(newCode) {
    this.props.setNewSolutionCode(newCode);
  }

  renderNewTest() {
    return (
      <div>
      <Row className="show-grid">
        <Col md={12}>
          <h5>Description</h5>
          <input 
            id="newTestDescription" 
            type="text" 
            name="testDescription" 
            placeholder="Add a Description" 
            style={{width: '100%'}} 
          />
        </Col>
      </Row>
      <Row className="show-grid">
        <Col md={6}>
          <h5>Arguments</h5>
          <input 
            id="newTestArguments" 
            type="text" 
            name="testCategory" 
            placeholder="Add Arguments" 
            style={{width: '100%'}}
          />
        </Col>
        <Col md={6}>
          <h5>Output</h5>
          <input 
            id="newTestOutput" 
            type="text" 
            name="testOutput"
            placeholder="Add an Output" 
            style={{width: '100%'}}
          />
        </Col>
      </Row>
      </div>
  )}

  render() {

    var convertToSoftTabs = function(cm) {
      if (cm.somethingSelected()) {
        cm.indentSelection();
      } else {
        var spaces = Array(cm.getOption('indentUnit') + 1).join(' ');
        cm.replaceSelection(spaces);
      }
    };
 
    var options = {
      lineNumbers: true,
      extraKeys: {
        Tab: convertToSoftTabs
      },
      mode: 'text/javascript',
      tabSize: 2,
      theme: 'material'
    };

    let newModal = 
      <Modal show={this.props.newUserToyProblemModal} onHide={ () => this.props.toggleNewUserToyProblemModal(false) }>
        <Modal.Header closeButton>
          <Modal.Title>Add Your Own Toy Problem!</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <Row className="show-grid">
            <Col md={12}>
              <h5>Name</h5>
              <input 
                id="newToyProblemName" 
                type="text" 
                name="Name"
                placeholder="Add a name"
                style={{width: '50%'}} 
              />
            </Col>
          </Row>

          <Row className="show-grid">
            <Col md={12}>
              <h5>Description</h5>
              <input 
                id="newToyProblemDescription" 
                type="text" 
                name="Description" 
                placeholder="Add a description"
                style={{width: '100%'}} 
              />
            </Col>
          </Row>

          <Row className="show-grid">
            <Col md={12}>
              <h5>Hint</h5>
              <input 
                id="newToyProblemHint" 
                type="text" 
                name="Hint" 
                placeholder="Add a Hint"
                style={{width: '100%'}} 
              />
            </Col>
          </Row>

          <Row className="show-grid">
            <Col md={6}>
              <h5>Category</h5>
              <input 
                id="newToyProblemCategory" 
                type="text" 
                name="Category" 
                placeholder="Add a Category" 
                style={{width: '100%'}}
              />
            </Col>
            <Col md={6}>
              <h5>Difficulty</h5>
                <select id="newToyProblemDifficulty">
                  <option value="one">1</option>
                  <option value="two">2</option>
                  <option value="three">3</option>
                  <option value="four">4</option>
                </select>
            </Col>
          </Row>

          <Row className="show-grid">
            <Col md={12}>
              <h5>Skeleton Code</h5>
              <div className="editor-container" id='newToyProblemSkeletonCode'>
                <CodeMirror
                  value={this.props.newSkeletonCode}
                  onChange={this.onNewSkeletonCodeChange}
                  options={options} 
                />
              </div>
            </Col>
          </Row>

          <Row className="show-grid">
            <Col md={12}>
              <h5>Solution Code</h5>
              <div className="editor-container" id='newToyProblemSolutionCode'>
                <CodeMirror 
                  value={this.props.newSolutionCode}
                  onChange={this.onNewSolutionCodeChange}
                  options={options} 
                />
              </div>
            </Col>
          </Row>

          <hr />
          <h4>Tests</h4>
          
          {this.renderNewTest()}
          <br />
          <Row className="show-grid">
            <Col md={6}>
              <Button 
                bsStyle="info" 
                bsSize="xsmall"
                onClick = { () => this.renderNewTest() }
              >+ Test
              </Button>
            </Col>
          </Row>

        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => this.props.toggleNewUserToyProblemModal(false) }>Close</Button>
          <Button bsStyle='primary' onClick={() => {

            let newName = document.getElementById('newToyProblemName').value;
            let newDescription = document.getElementById('newToyProblemDescription').value;
            let newCategory = document.getElementById('newToyProblemCategory').value;
            let newHint = document.getElementById('newToyProblemHint').value;
            let newDifficulty = document.getElementById('newToyProblemDifficulty');
            let newDifficulty2 = newDifficulty.options[newDifficulty.selectedIndex].text;
            let newSkeletonCode = this.props.newSkeletonCode;
            let newSolutionCode = this.props.newSolutionCode;

            let newTestDescription = document.getElementById('newTestDescription').value;
            let newTestArguments = document.getElementById('newTestArguments').value;
            let newTestOutput = document.getElementById('newTestOutput').value;

            this.props.toggleNewUserToyProblemModal(false);

            let newToyProblem = {
              userId: this.props.userProfileData.id,
              name: newName, 
              description: newDescription, 
              category: newCategory,
              hint: newHint,
              difficulty: newDifficulty2,
              skeletonCode: newSkeletonCode,
              solutionCode: newSolutionCode
            };

            let newToyProblemTest = {
              arguments: newTestArguments,
              description: newTestDescription,
              expectedOutput: newTestOutput,
              promptId: '',
            }

            this.props.postUserToyProblem(newToyProblem, newToyProblemTest);

          }}>Submit</Button>
        </Modal.Footer>
      </Modal>;



    let modal =
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

          { this.props.currentUserToyProblem.id ?
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
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => this.props.toggleUpdateUserToyProblemModal(false) }>Close</Button>
          <Button bsStyle='primary' onClick={() => {
            var today = new Date();
            today = today.getMonth()+1 + '/' + today.getDate() + '/' + today.getFullYear();

            let newName = document.getElementById('toyProblemName').value;
            let newDescription = document.getElementById('toyProblemDescription').value;
            let newCategory = document.getElementById('toyProblemCategory').value;
            let newDifficulty = document.getElementById('toyProblemDifficulty').value;
            let newHint = document.getElementById('toyProblemHint').value;
            let skeletonCode = this.props.skeletonCode;
            let solutionCode = this.props.solutionCode;

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
              skeletonCode: skeletonCode,
              solutionCode: solutionCode
            });

            for (let i = 0; i < toy.tests.length; i++) {
              let obj = {};
              obj.promptId = toy.id;
              obj.id = toy.tests[i].id;
              obj.description = document.getElementById(`testDescription${i}`).value;
              obj.arguments = document.getElementById(`testArguments${i}`).value;
              obj.expectedOutput = document.getElementById(`testOutput${i}`).value;
              testArray.push(obj);
            };

            this.props.updateToyProblemTests(testArray);
            this.props.toggleUpdateUserToyProblemModal(false);

          }}>Update</Button>
        </Modal.Footer>
      </Modal>;






    return (
      <div>
        {newModal}
        {modal}
        <Table responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Description</th>
              <th>Category</th>
              <th>Difficulty</th>
              <th><Button 
                bsStyle="success" 
                bsSize="xsmall"
                onClick={ () => {
                  this.props.toggleNewUserToyProblemModal(true);
                }}>+ New</Button>
              </th>
            </tr>
          </thead>
          <tbody>
            { this.props.userToyProblems ?
              this.props.userToyProblems.map((row,index) => (
              <tr key={index}>
                <td>{index+1}</td>
                <td>{row.name}</td>
                <td>{row.description}</td>
                <td>{row.category}</td>
                <td>{row.difficulty}</td>
                <td><Button 
                  bsStyle="warning" 
                  bsSize="xsmall" 
                  onClick={ () => {
                    this.props.toggleUpdateUserToyProblemModal(true);
                    this.props.setCurrentUserToyProblem(row);
                  }}>Update</Button>
                </td>
              </tr> )
            ):
              ('Loading')}
          </tbody>
        </Table>
      </div>
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

function mapDispatchToProps(dispatch) {
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
    // getUserToyProblemTests: getUserToyProblemTests, 
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(YourToyProblems);

