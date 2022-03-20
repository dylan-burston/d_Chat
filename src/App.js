import logo from './logo.svg';
import './App.css';
import React from 'react';
import AuthPage from './pages/AuthPage/AuthPage';
import Messenger from './pages/Messenger/Messenger';


class App extends React.Component {

  state = {
    user: null
  }

  setUserState = (incomingUser) => {
    this.setState({
      user: incomingUser
    })
  }


  render() {

    return (
      <div className="App">
       {this.state.user ? <Messenger user={this.state.user}/> : <AuthPage setUserState={this.setUserState}/>
        }
      </div>
    );
  }
}

export default App;
