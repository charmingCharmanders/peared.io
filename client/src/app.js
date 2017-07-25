import React from 'react';
import Session from './components/session';
import Dashboard from './components/dashboard';
import Navigation from './components/navigation';
import {browserHistory, Redirect} from 'react-router';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import io from 'socket.io-client';
import {updateButtonStatus, dashboardToSession, updateRoomId, sessionToDashboard, updatePrompt, updateCode, updateTestResults} from './actions';
import {bindActionCreators} from 'redux';

class App extends React.Component {

  connectionUrl() { 
    const protocol = window.location.protocol;
    const hostname = window.location.hostname;

    if (hostname === '127.0.0.1' || hostname === 'localhost') {
      return 'http://127.0.0.1:3001';
    } else if (hostname === 'staging-peared.herokuapp.com') {
      return `${protocol}//staging-connection-peared.herokuapp.com`;
    } else if (hostname === 'staging.peared.io') {
      return `${protocol}//staging.connection.peared.io`;
    } else if (hostname === 'peared.herokuapp.com') {
      return `${protocol}//connection-peared.herokuapp.com`;
    } else {
      return `${protocol}//connection.peared.io`;
    }
  }

  openConnection() {
    this.socket = io.connect(this.connectionUrl());
    this.socket.on('connect', ()=>{
      this.socket.on('room id', (roomId) =>{
        this.props.updateRoomId(roomId);
      });
      this.socket.on('prompt', (prompt) =>{
        this.props.updatePrompt(prompt);
        this.props.updateCode(prompt.skeletonCode);
        this.props.updateButtonStatus(false);
      });
      this.socket.on('edit', (code)=>{
        this.props.updateCode(code);
      });
      this.socket.on('testResults', (testResults)=>{
        this.props.updateTestResults(testResults);
      });
    });
  }

  closeConnection() {
    this.socket.disconnect();
  }

  render() {
    return (
      <Router history={browserHistory}>
        <div className="app-container">
          <Navigation
            openConnection={this.openConnection.bind(this)}
            closeConnection={this.closeConnection.bind(this)}
          />
          <div className="main-container">
            <Switch>
              <Route 
                exact path='/'
                render={()=>{ return (<Dashboard closeConnection={this.closeConnection.bind(this)}/>); }}
              />
              <Route 
                path='/session'
                render={ () => {
                  return (
                    this.props.isDashboard ? 
                      (<Redirect to='/' />) :    
                      (<Session socketConnection={this.socket}/>)
                    );
                } }
              />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

var mapStateToProps = function(state) {
  return {
    nav: state.nav,
    isDashboard: state.isDashboard
  };
};

var mapDispatchToProps = function(dispatch) {
  return bindActionCreators(
    {
      updateButtonStatus: updateButtonStatus,
      dashboardToSession: dashboardToSession,
      updateRoomId: updateRoomId,
      updateCode: updateCode,
      updatePrompt: updatePrompt,
      updateTestResults: updateTestResults,
      sessionToDashboard: sessionToDashboard,
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
