import React from 'react';
import ReactDOM from 'react-dom';
import View from './components/view';
import Header from './components/header';
import DashBoard from './components/dashboard';
import {BrowserRouter} from 'react-router-dom';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return (
      <div>
        <Header/>
        <BrowserRouter>
          <DashBoard/>
        </BrowserRouter>
      </div>
    )
  }


}



ReactDOM.render(<App/>, document.getElementById('root'));
