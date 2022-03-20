import logo from './logo.svg';
import './App.css';
import React from 'react';
import AuthPage from './pages/AuthPage/AuthPage';


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
       {this.state.user ? <h1> Logged In </h1> : <AuthPage setUserState={this.setUserState}/>
        }
      </div>
    );
  }
}

export default App;
