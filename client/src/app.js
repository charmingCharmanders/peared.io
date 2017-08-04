import Footer from './components/footer';
import React from 'react';
import Session from './components/session';
import Dashboard from './components/dashboard';
import Navigation from './components/navigation';
import {browserHistory, Redirect} from 'react-router';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import io from 'socket.io-client';
import {updatePartnerData, closeModal, openModal, updateUserFriendsData, populateUserFriendsData, populateUserSessionsData, populateUserData, updateButtonStatus, dashboardToSession, updateRoomId, sessionToDashboard, startSession, updatePrompt, updateCode, updateCurrentSession, updateTestResults, updateOnlineUsers} from './actions';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      socket: null
    };
  }

  httpsRedirect() {
    const protocol = window.location.protocol;
    const hostname = window.location.hostname;

    if (hostname === 'peared.io' && protocol === 'http:') {
      location.href = 'https://' + hostname;
    }
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
    this.setState({
      socket: io.connect(this.connectionUrl(),
        { query:
        {
          profileId: this.props.profile.id,
          rating: this.props.profile.rating,
          firstName: this.props.profile.firstName,
          lastName: this.props.profile.lastName
        }
        })
    });
    this.state.socket.on('connect', ()=>{
      this.state.socket.on('startSession', (sessionData) =>{
        this.props.updateButtonStatus(false);
        this.props.updateCode(sessionData.prompt.skeletonCode);
        this.props.updateCurrentSession(sessionData);
        this.props.updatePrompt(sessionData.prompt);
        this.props.updateRoomId(sessionData.roomId);
      });
      this.state.socket.on('end session', (modalType) => {
        this.props.sessionToDashboard();
        this.props.openModal(modalType);
        this.props.populateUserSessionsData(this.props.profile.id);
        this.props.updateButtonStatus(true);
        this.props.updateCode(null);
        this.props.updateCurrentSession(null);
        this.props.updateRoomId(null);
        this.props.updateTestResults(null);
        this.state.socket.emit('leave room');
      });
      this.state.socket.on('session request rejected', (modalType) => {
        this.props.closeModal();
        this.state.socket.emit('leave room');
      });
      this.state.socket.on('users online', (userCount)=>{
        this.props.updateOnlineUsers(userCount);
        if (this.props.friendsList.friendArray) {
          this.state.socket.emit('friends list', this.props.friendsList);
        }
      });
      this.state.socket.on('edit', (code)=>{
        this.props.updateCode(code);
      });
      this.state.socket.on('testResults', (testResults)=>{
        this.props.updateTestResults(testResults);
      });
      this.state.socket.on('room request', (requestData)=>{
        console.log('request Data:', requestData);
        this.props.updateRoomId(requestData.roomId);
        delete requestData['roomId'];
        this.props.updatePartnerData(requestData);
        this.props.openModal('receivingRoomRequest');
      });
      this.state.socket.on('session request canceled', ()=>{
        this.props.closeModal();
        this.props.updateCode(null);
        this.props.updateCurrentSession(null);
        this.props.updateRoomId(null);
        this.props.updateTestResults(null);
      });

    });
  }

  componentWillMount() {
    this.httpsRedirect();
    this.props.populateUserData()
      .then(()=>{
        this.openConnection();
        this.props.populateUserFriendsData(this.props.profile.id)
        .then(()=>{
          this.state.socket.on('friends list', (friendsList)=>{
            this.props.updateUserFriendsData(friendsList);
          });
          if (this.props.friendsList.friendArray) {
            this.state.socket.emit('friends list', this.props.friendsList);
          }
        });
        this.props.populateUserSessionsData(this.props.profile.id);
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
                render={ () => {
                  return (
                    this.props.isDashboard ? 
                      (<Dashboard socket={this.state.socket} />) :    
                      (<Redirect to='/session' />)
                  );
                } }
              />
              <Route 
                path='/session'
                render={ () => {
                  return (
                    this.props.isDashboard ? 
                      (<Redirect to='/' />) :    
                      (<Session socketConnection={this.state.socket} />)
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
    friendsList: state.userFriendData,
    profile: state.userProfileData
  };
};

var mapDispatchToProps = function(dispatch) {
  return bindActionCreators(
    {
      updatePartnerData: updatePartnerData,
      closeModal: closeModal,
      openModal: openModal,
      populateUserFriendsData: populateUserFriendsData,
      populateUserData: populateUserData,
      populateUserSessionsData: populateUserSessionsData,
      updateButtonStatus: updateButtonStatus,
      dashboardToSession: dashboardToSession,
      updateRoomId: updateRoomId,
      updateCode: updateCode,
      updateUserFriendsData: updateUserFriendsData,
      updateCurrentSession: updateCurrentSession,
      updatePrompt: updatePrompt,
      updateTestResults: updateTestResults,
      sessionToDashboard: sessionToDashboard,
      updateOnlineUsers: updateOnlineUsers,
      startSession: startSession
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
