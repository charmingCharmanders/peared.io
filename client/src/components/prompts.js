import CodeMirror from '@skidding/react-codemirror';
import React from 'react';
import TrashIcon from './trashIcon';
import UpdateToyProblemModal from './updateToyProblemModal';
import jsBeautify from 'js-beautify';
import jsMode from 'codemirror/mode/javascript/javascript';
import { Button, Col, FieldGroup, Grid, Modal, Row, Table} from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  addTest,
  deleteToyProblem,
  postUserToyProblem,
  setCurrentUserToyProblem,
  setInitialSkeletonCode,
  setInitialSolutionCode,
  setNewSkeletonCode,
  setNewSolutionCode,
  toggleNewUserToyProblemModal,
  toggleUpdateUserToyProblemModal,
  updateSkeletonCode,
  updateSolutionCode,
  updateToyProblemTests,
  updateUserToyProblem
} from '../actions';

class Prompts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onNewSkeletonCodeChange = this.onNewSkeletonCodeChange.bind(this);
    this.onNewSolutionCodeChange = this.onNewSolutionCodeChange.bind(this);
  }

  componentDidMount() {
    this.setState({
      codeMirrorOptions: {
        extraKeys: {
          Tab: this.convertToSoftTabs
        },
        lineNumbers: true,
        mode: 'text/javascript',
        tabSize: 2,
        theme: 'material'
      }
    });
  }

  convertToSoftTabs(cm) {
    if (cm.somethingSelected()) {
      cm.indentSelection();
    } else {
      const spaces = Array(cm.getOption('indentUnit') + 1).join(' ');
      cm.replaceSelection(spaces);
    }
  }

  onNewSkeletonCodeChange(newCode) {
    this.props.setNewSkeletonCode(newCode);
  }

  onNewSolutionCodeChange(newCode) {
    this.props.setNewSolutionCode(newCode);
  }

  render() {
    let newModal = 
      <Modal show={this.props.newUserToyProblemModal} onHide={() => this.props.toggleNewUserToyProblemModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Your Own Toy Problem!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
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
          <Row>
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
          <Row>
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
          <Row>
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
          <Row>
            <Col md={12}>
              <h5>Skeleton Code</h5>
              <div className="editor-container" id='newToyProblemSkeletonCode'>
                <CodeMirror
                  onChange={this.onNewSkeletonCodeChange}
                  options={this.state.codeMirrorOptions}
                  value={this.props.newSkeletonCode} />
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <h5>Solution Code</h5>
              <div className="editor-container" id='newToyProblemSolutionCode'>
                <CodeMirror 
                  onChange={this.onNewSolutionCodeChange}
                  options={this.state.codeMirrorOptions}
                  value={this.props.newSolutionCode} />
              </div>
            </Col>
          </Row>
          <hr />
          <h4>Tests</h4>
          <Row>
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
          <Row>
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
          <br />
          <Row>
            <Col md={6}>
              <Button
                bsSize="xsmall"
                bsStyle="info"
                onClick = {() => this.props.addTest()}
              >+ Test</Button>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => this.props.toggleNewUserToyProblemModal(false) }>Close</Button>
          <Button bsStyle='primary' onClick={() => {
            let newCategory = document.getElementById('newToyProblemCategory').value;
            let newDescription = document.getElementById('newToyProblemDescription').value;
            let newDifficulty = document.getElementById('newToyProblemDifficulty');
            let newDifficulty2 = newDifficulty.options[newDifficulty.selectedIndex].text;
            let newHint = document.getElementById('newToyProblemHint').value;
            let newName = document.getElementById('newToyProblemName').value;
            let newSkeletonCode = this.props.newSkeletonCode;
            let newSolutionCode = this.props.newSolutionCode;
            let newTestArguments = document.getElementById('newTestArguments').value;
            let newTestDescription = document.getElementById('newTestDescription').value;
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
              promptId: ''
            };

            this.props.postUserToyProblem(newToyProblem, newToyProblemTest);
            this.props.setNewSkeletonCode('const functionName = function() {}');
            this.props.setNewSolutionCode('const functionName = function() {}');
          }}>Submit</Button>
        </Modal.Footer>
      </Modal>;
    
    return (
      <div>
        {newModal}
        <UpdateToyProblemModal test={this.props.currentUserToyProblem} test2={this.props.userToyProblems}/>
        <Table bordered>
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Category</th>
              <th>Difficulty</th>
              <th>
                <Button
                  bsSize="xsmall"
                  bsStyle="success"
                  onClick={() => {
                    this.props.toggleNewUserToyProblemModal(true);
                  }}>+ New</Button>
              </th>
              <th>&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            {this.props.userToyProblems ?
              this.props.userToyProblems.map((row, index) => (
                <tr key={index}>
                  <td>{row.name}</td>
                  <td>{row.description}</td>
                  <td>{row.category}</td>
                  <td>{row.difficulty}</td>
                  <td>
                    <Button
                      bsSize="xsmall" 
                      bsStyle="warning"
                      onClick={ () => {
                        this.props.toggleUpdateUserToyProblemModal(true);
                        this.props.setCurrentUserToyProblem(row);
                      }}>Update</Button>
                  </td>
                  <td>
                    <div onClick={() => this.props.deleteToyProblem(row.id)}>
                      <TrashIcon />
                    </div>
                  </td>
                </tr> )
              ) : null}
          </tbody>
        </Table>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentUserToyProblem: state.currentUserToyProblem,
    newSkeletonCode: state.newSkeletonCode,
    newSolutionCode: state.newSolutionCode,
    newUserToyProblemModal: state.newUserToyProblemModal,
    skeletonCode: state.skeletonCode,
    solutionCode: state.solutionCode,
    userProfileData: state.userProfileData,
    userToyProblems: state.userToyProblems,
    updateUserToyProblemModal: state.updateUserToyProblemModal,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    addTest: addTest,
    deleteToyProblem: deleteToyProblem,
    postUserToyProblem: postUserToyProblem,
    setCurrentUserToyProblem: setCurrentUserToyProblem,
    setNewSkeletonCode: setNewSkeletonCode,
    setNewSolutionCode: setNewSolutionCode,
    setInitialSkeletonCode: setInitialSkeletonCode,
    setInitialSolutionCode: setInitialSolutionCode,
    toggleNewUserToyProblemModal: toggleNewUserToyProblemModal,
    toggleUpdateUserToyProblemModal: toggleUpdateUserToyProblemModal,
    updateSkeletonCode: updateSkeletonCode,
    updateSolutionCode: updateSolutionCode,
    updateToyProblemTests: updateToyProblemTests,
    updateUserToyProblem: updateUserToyProblem
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Prompts);
