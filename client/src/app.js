import React from 'react';
import Session from './components/session';
import Dashboard from './components/dashboard';
import Navigation from './components/navigation';
import {browserHistory, Redirect} from 'react-router';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import io from 'socket.io-client';
import {populateUserProfileFriendsAndSessionData, updateButtonStatus, dashboardToSession, updateRoomId, sessionToDashboard, updatePrompt, updateCode, updateTestResults, updateOnlineUsers} from './actions';
import {bindActionCreators} from 'redux';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      socket: null
    };
  }

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
    console.log("profile id:", this);
    this.setState({
      socket: io.connect(this.connectionUrl(), { query: { profileId: this.props.profile.id } })
    });
    this.state.socket.on('connect', ()=>{
      this.state.socket.on('startSession', (sessionData) =>{
        this.props.updateButtonStatus(false);
        this.props.updateCode(sessionData.prompt.skeletonCode);
        this.props.updatePrompt(sessionData.prompt);
        this.props.updateRoomId(sessionData.roomId);
      });
      this.state.socket.on('users online', (userCount)=>{
        this.props.updateOnlineUsers(userCount);
      });
      this.state.socket.on('edit', (code)=>{
        this.props.updateCode(code);
      });
      this.state.socket.on('testResults', (testResults)=>{
        this.props.updateTestResults(testResults);
      });
    });
  }

  componentWillMount() {
    this.props.populateUserProfileFriendsAndSessionData()
    .then(()=>{
      console.log("this is:", this);
      this.openConnection();
    });
  }

  render() {
    return (
      <Router history={browserHistory}>
        <div className="app-container">
          <Navigation socket={this.state.socket}/>
          <div className="main-container">
            <Switch>
              <Route 
                exact path='/'
                render={()=>{ return (<Dashboard socket={this.state.socket}/>); }}
              />
              <Route 
                path='/session'
                render={ () => {
                  return (
                    this.props.isDashboard ? 
                      (<Redirect to='/' />) :    
                      (<Session socketConnection={this.state.socket}/>)
                  );
                } }
              />
              <Route path='/' component={Dashboard} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

var mapStateToProps = function(state) {
  return {
    isDashboard: state.isDashboard,
    nav: state.nav,
    profile: state.userProfileData
  };
};

var mapDispatchToProps = function(dispatch) {
  return bindActionCreators(
    {
      populateUserProfileFriendsAndSessionData: populateUserProfileFriendsAndSessionData,
      updateButtonStatus: updateButtonStatus,
      dashboardToSession: dashboardToSession,
      updateRoomId: updateRoomId,
      updateCode: updateCode,
      updatePrompt: updatePrompt,
      updateTestResults: updateTestResults,
      sessionToDashboard: sessionToDashboard,
      updateOnlineUsers: updateOnlineUsers,
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
