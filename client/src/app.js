import React from 'react';
import ReactDOM from 'react-dom';
import View from './components/view';
import Session from './components/session';
import Dashboard from './components/dashboard';
import Navigation from './components/navigation';
import {BrowserRouter as Router, browserHistory, Switch, Route, Link} from 'react-router-dom';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDashboard: true
    }
  }

  toggleView() {
    this.setState({isDashboard: !this.state.isDashboard})
  }

  render() {
    return (
    <div>
      <Navigation isDashboard={this.state.isDashboard} toggleView={this.toggleView.bind(this)}/>
      <Route exact path='/' component={Dashboard} />
      <Route path='/session' component={Session} />
    </div>
    )
  }
}

ReactDOM.render(<Router history={browserHistory}><App /></Router>, document.getElementById('root'));
