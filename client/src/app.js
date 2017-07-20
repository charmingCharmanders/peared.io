import React from 'react';
import ReactDOM from 'react-dom';
import View from './components/view';
import Session from './components/session';
import Dashboard from './components/dashboard';
import Navigation from './components/navigation';
import browserHistory from 'react-router';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import store from './index';
import { Provider } from 'react-redux';

console.log('store', store);
console.log('store.getState', store.getState());

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDashboard: true
    };
    this.toggleView = this.toggleView.bind(this);
  }

  toggleView() {
    this.setState({ isDashboard: !this.state.isDashboard });
  }

  //need to toggle the view when we get a response form the socket.io connection toggleView={this.toggleView.bind(this)

  render() {
    return (
      <Router history={browserHistory}>
        <div>
          <Navigation isDashboard={this.state.isDashboard} toggleView={this.toggleView}/>
          <Switch>
            <Route exact path='/' component={Dashboard} />
            <Route path='/session' component={Session} />
          </Switch>
        </div>
      </Router>
    );
  }
}

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
