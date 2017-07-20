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

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  //need to toggle the view when we get a response form the socket.io connection toggleView={this.toggleView.bind(this)

  render() {
    return (
      <Router history={browserHistory}>
        <div>
          <Navigation />
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
