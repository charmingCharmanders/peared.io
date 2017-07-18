import React from 'react';
import ReactDOM from 'react-dom';
import View from './components/view';
import Session from './components/session';
import Dashboard from './components/dashboard';
import Navigation from './components/navigation';
import ReactModal from 'react-modal';
import browserHistory from 'react-router';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import {withRouter} from 'react-router-dom';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDashboard: true
    };
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.toggleView = this.toggleView.bind(this);
  }

  toggleView() {
    this.setState({isDashboard: !this.state.isDashboard});
  }

  handleOpenModal () {
    this.setState({ showModal: true });
  }

  handleCloseModal () {
    this.setState({ showModal: false });
    this.toggleView();
  }

  //need to toggle the view when we get a response form the socket.io connection toggleView={this.toggleView.bind(this)

  render() {
    return (
      <Router history={browserHistory}>
        <div>
          <Navigation isDashboard={this.state.isDashboard} toggleView={this.toggleView} handleOpenModal={this.handleOpenModal}/>
          <Switch>
            <Route exact path='/' component={Dashboard} />
            <Route path='/session' component={Session} />
          </Switch>
          <ReactModal
             isOpen={this.state.showModal}
             contentLabel="Inline Styles Modal Example"
             style={{
                overlay: {
                  backgroundColor: 'papayawhip'
                },
                content: {
                  color: 'lightsteelblue'
                }
              }}
          >
            <p>Modal text!</p>
            <button onClick={this.handleCloseModal}>Close Modal</button>
          </ReactModal>
        </div>
      </Router>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
