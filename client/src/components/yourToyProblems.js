import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { 
  postUserToyProblem, setCurrentUserToyProblem, updateUserToyProblem, toggleUpdateUserToyProblemModal, toggleNewUserToyProblemModal} from '../actions'
import {form, FieldGroup, Modal, Table, ButtonToolbar, Button, Navbar, CollapsibleNav, NavItem, NavDropdown, Nav, MenuItem, Grid, Col, Row} from 'react-bootstrap';

class YourToyProblems extends React.Component {

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
            <Col md={6}>
              <h5>Category</h5>
              <input 
                id="newToyProblemCategory" 
                type="text" 
                name="Category" 
                placeholder="Add A Category" 
                style={{width: '100%'}}
              />
            </Col>
            <Col md={6}>
              <h5>Difficulty</h5>
              <input 
                id="newToyProblemDifficulty" 
                type="text" 
                name="Difficulty"
                placeholder="Add a Difficulty"
                style={{width: '100%'}}
              />
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
                // onClick={ () => console.log('clicked')}
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
            let newDifficulty = document.getElementById('newToyProblemDifficulty').value;

            let newTestDescription = document.getElementById('newTestDescription').value;
            let newTestArguments = document.getElementById('newTestArguments').value;
            let newTestOutput = document.getElementById('newTestOutput').value;

            this.props.toggleNewUserToyProblemModal(false);

            let obj = {
              // userId: this.props.userProfileData.id
              name: newName, 
              description: newDescription, 
              category: newCategory, 
              difficulty: newDifficulty
            };

            this.props.postUserToyProblem(obj);
          
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

          <hr />
          <h4>Tests</h4>

          { this.props.currentUserToyProblem.id ?
            this.props.currentUserToyProblem.tests.map((test, index) => (
              <div key={index}>
                <Row className="show-grid">
                  <Col md={12}>
                    <h5>Description</h5>
                    <input 
                      id="testDescription" 
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
                      id="testCategory" 
                      type="text" 
                      name="testCategory" 
                      defaultValue={test.arguments} 
                      style={{width: '100%'}}
                    />
                  </Col>
                  <Col md={6}>
                    <h5>Output</h5>
                    <input 
                      id="testDifficulty" 
                      type="text" 
                      name="testDifficulty"
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

            this.props.toggleUpdateUserToyProblemModal(false);
            this.props.updateUserToyProblem({id: this.props.currentUserToyProblem.id, name: newName, description: newDescription, category: newCategory, difficulty: newDifficulty, updatedAt: today});
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
            {this.props.userToyProblems.map((row,index) => (
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
            )}
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
    currentUserToyProblem: state.currentUserToyProblem
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    updateUserToyProblem: updateUserToyProblem, 
    toggleNewUserToyProblemModal: toggleNewUserToyProblemModal,
    toggleUpdateUserToyProblemModal: toggleUpdateUserToyProblemModal,
    setCurrentUserToyProblem: setCurrentUserToyProblem,
    postUserToyProblem: postUserToyProblem,
    // getUserToyProblemTests: getUserToyProblemTests, 
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(YourToyProblems);
