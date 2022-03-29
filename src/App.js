import './App.css';
import React from 'react';
import { Route, Switch, Redirect, Link } from 'react-router-dom';
import Messenger from './pages/Messenger/Messenger';
import AuthPage from './pages/AuthPage/AuthPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import UserLogOut from './components/UserLogOut/UserLogOut';

class App extends React.Component {

  state = {
    user: null,
  }

  grabUserData = () => {
    let token = localStorage.getItem('token');
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      if (payload.exp < Date.now() / 1000) {
        localStorage.removeItem('token');
        token = null;
      } else {
        this.setState({user: payload.user});
      }
    }
  }

  handleLogOut = () => {
    let token = localStorage.getItem('token');
    token = null;
    localStorage.removeItem('token');
    this.setState({user: null})      
  }

  componentDidMount() {
    this.grabUserData();
  }
  
  setUserState = (incomingUser) => {
    this.setState({
      user: incomingUser
    })
  }

  render() {
    return (
      <div className="App">
        <nav>
          <Link to='/profile'><button>Profile</button></Link>
          <Link to='/messenger'><button>Chat</button></Link>
          <div className="logoutBtn">
            <UserLogOut className="logout" handleLogOut={this.handleLogOut}/>
          </div>
        </nav>
        <Switch>
          {this.state.user ?
            <>
              <Route path="/profile">
                <ProfilePage user={this.state.user}/>
              </Route>
              <Route path="/messenger">
                <Messenger user={this.state.user}/>
              </Route>
              <Redirect to="/profile" />
            </>
          :
            <Route path="/">
              <AuthPage setUserState={this.setUserState}/>
            </Route>
          }
        </Switch>
      </div>
    );
  }
}

export default App;
