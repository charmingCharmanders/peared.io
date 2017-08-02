import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import TrashIcon from './trashIcon';
import UpdateToyProblemModal from './updateToyProblemModal';
import { setInitialSkeletonCode, setInitialSolutionCode, addTest, deleteToyProblem, setNewSkeletonCode, setNewSolutionCode, updateSkeletonCode, updateSolutionCode, updateToyProblemTests, postUserToyProblem, setCurrentUserToyProblem, updateUserToyProblem, toggleUpdateUserToyProblemModal, toggleNewUserToyProblemModal} from '../actions';
import {form, FieldGroup, Modal, Table, ButtonToolbar, Button, Navbar, CollapsibleNav, NavItem, NavDropdown, Nav, MenuItem, Grid, Col, Row} from 'react-bootstrap';
import CodeMirror from '@skidding/react-codemirror';
// var js_beautify = require('js-beautify');
require('codemirror/mode/javascript/javascript');

class YourToyProblems extends React.Component {

  constructor(props) {
    super(props);
    this.onNewSkeletonCodeChange = this.onNewSkeletonCodeChange.bind(this);
    this.onNewSolutionCodeChange = this.onNewSolutionCodeChange.bind(this);
  }

  onNewSkeletonCodeChange(newCode) {
    this.props.setNewSkeletonCode(newCode);
  }

  onNewSolutionCodeChange(newCode) {
    this.props.setNewSolutionCode(newCode);
  }

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

          <br />
          <Row className="show-grid">
            <Col md={6}>
              <Button 
                bsStyle="info" 
                bsSize="xsmall"
                onClick = { () => this.props.addTest() }
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
            };

            this.props.postUserToyProblem(newToyProblem, newToyProblemTest);

          }}>Submit</Button>
        </Modal.Footer>
      </Modal>;



    
    return (
      <div>
        {newModal}
        <UpdateToyProblemModal test={this.props.currentUserToyProblem} test2={this.props.userToyProblems}/>
        <Table responsive bordered condensed hover striped>
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
              <th>Delete?</th>
            </tr>
          </thead>
          <tbody>
            { this.props.userToyProblems ?
              this.props.userToyProblems.map((row, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
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
                  <td>
                    <div onClick={ () => this.props.deleteToyProblem(row.id) }>
                      <TrashIcon />
                    </div>
                  </td>
                </tr> )
              ) :
              ('Loading')}
          </tbody>
        </Table>
      </div>
    );




    // return (
    //   <div>
    //     {newModal}
    //     <UpdateToyProblemModal test={this.props.currentUserToyProblem} test2={this.props.userToyProblems}/>
    //     <Table responsive>
    //       <thead>
    //         <tr>
    //           <th>#</th>
    //           <th>Name</th>
    //           <th>Description</th>
    //           <th>Category</th>
    //           <th>Difficulty</th>
    //           <th><Button 
    //             bsStyle="success" 
    //             bsSize="xsmall"
    //             onClick={ () => {
    //               this.props.toggleNewUserToyProblemModal(true);
    //             }}>+ New</Button>
    //           </th>
    //           <th> </th>
    //         </tr>
    //       </thead>
    //       <tbody>
    //         { this.props.userToyProblems ?
    //           this.props.userToyProblems.map((row, index) => (
    //             <tr key={index}>
    //               <td>{index + 1}</td>
    //               <td>{row.name}</td>
    //               <td>{row.description}</td>
    //               <td>{row.category}</td>
    //               <td>{row.difficulty}</td>
    //               <td><Button 
    //                 bsStyle="warning" 
    //                 bsSize="xsmall" 
    //                 onClick={ () => {
    //                   this.props.toggleUpdateUserToyProblemModal(true);
    //                   this.props.setCurrentUserToyProblem(row);
    //                 }}>Update</Button>
    //               </td>
    //               <td>
    //                 <div onClick={ () => this.props.deleteToyProblem(row.id) }>
    //                   <TrashIcon />
    //                 </div>
    //               </td>
    //             </tr> )
    //           ) :
    //           ('Loading')}
    //       </tbody>
    //     </Table>
    //   </div>
    // );
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

export default connect(mapStateToProps, mapDispatchToProps)(YourToyProblems);


