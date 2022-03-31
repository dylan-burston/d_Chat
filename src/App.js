import './App.css';
import React from 'react';
import { Route, Switch, Redirect, Link } from 'react-router-dom';
import Messenger from './pages/Messenger/Messenger';
import AuthPage from './pages/AuthPage/AuthPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import UserLogOut from './components/UserLogOut/UserLogOut';
import axios from 'axios';

class App extends React.Component {

  state = {
    user: null,
    friends: [],
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

  getFriends = async () => {
    let friendsData = await axios.get(`/api/users/${this.state.user._id}/friends`);
    this.setState({friends: friendsData.data});
  }

  grabUserFromDB = async () => {
    let userData = await axios.get(`/api/users/${this.state.user._id}`)
    this.setState({user: userData.data});
  }

  handleLogOut = () => {
    let token = localStorage.getItem('token');
    token = null;
    localStorage.removeItem('token');
    this.setState({user: null})      
  }

  handleDeleteAccount = async () => {
    await axios.delete(`/api/users/${this.state.user._id}`)
    await axios.delete(`/api/messages/${this.state.user._id}`)
    this.handleLogOut();
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
                <ProfilePage user={this.state.user} grabUserFromDB={this.grabUserFromDB} handleDeleteAccount={this.handleDeleteAccount}/>
              </Route>
              <Route path="/messenger">
                <Messenger user={this.state.user} friends={this.state.friends} grabUserFromDB={this.grabUserFromDB} getFriends={this.getFriends}/>
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