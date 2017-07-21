import React from 'react';
import Session from './components/session';
import Dashboard from './components/dashboard';
import Navigation from './components/navigation';
import browserHistory from 'react-router';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import io from 'socket.io-client';
import {updateButtonStatus, dashboardToSession, updateRoomId, sessionToDashboard, updatePrompt, updateCode} from './actions';
import {bindActionCreators} from 'redux';


class App extends React.Component {
  constructor(props){
    super(props);
    this.socket = null;
  }

  openConnection() {
    this.socket = io.connect('http://127.0.0.1:3001');
    this.socket.on('connect', ()=>{
      this.socket.on('room id', (roomId) =>{
        this.props.updateRoomId(roomId);
      });
      this.socket.on('prompt', (prompt) =>{
        this.props.updatePrompt(prompt);
        this.props.updateCode(prompt.skeletonCode);
        this.props.updateButtonStatus();
      });
      this.socket.on('edit', (code)=>{
        console.log('we should be updating the code', code);
        this.props.updateCode(code);
      });
    });
  }
  render() {
    return (
      <Router history={browserHistory}>
        <div>
          <Navigation openConnection={this.openConnection.bind(this)}/>
          <Switch>
            <Route exact path='/' component={Dashboard} />
            <Route 
              path='/session'
              render={()=>{return(<Session socketConnection={this.socket}/>);}}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}

var mapStateToProps = function(state) {
  return {
    nav: state.nav
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
      sessionToDashboard: sessionToDashboard,
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(App);