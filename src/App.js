import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Search from './pages/Search';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import NotFound from './pages/NotFound';
import { createUser } from './services/userAPI';
import Loading from './pages/Loading';

const MIN_LENGTH_NAME = 3;

class App extends React.Component {
  state = {
    loginName: '',
    isLoginButtonDisabled: true,
    logado: false,
    loadingAPI: false,
  }

  onInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    }, this.enableButton);
  }

  enableButton = () => {
    const { loginName } = this.state;
    const isDisabled = (loginName.length < MIN_LENGTH_NAME);
    this.setState({
      isLoginButtonDisabled: isDisabled,
    });
  }

  onLoginButtonClick = async (event) => {
    const { loginName } = this.state;
    event.preventDefault();
    this.setState({
      loadingAPI: true,
    }, async () => {
      await createUser({ name: loginName });
      this.setState({
        logado: true,
        loadingAPI: false,
      });
    });
  }

  render() {
    const { loginName, isLoginButtonDisabled, logado, loadingAPI } = this.state;
    return (
      <div>
        <Switch>
          <Route
            exact
            path="/"
            render={ () => (<Login
              loginName={ loginName }
              isButtonDisabled={ isLoginButtonDisabled }
              onChange={ this.onInputChange }
              onClick={ this.onLoginButtonClick }
              loadingAPI={ loadingAPI }
            />) }
          >
            { logado && <Redirect to="/search" /> }
          </Route>
          <Route exact path="/search" component={ Search } />
          <Route exact path="/album/:id" component={ Album } />
          <Route exact path="/favorites" component={ Favorites } />
          <Route exact path="/profile" component={ Profile } />
          <Route exact path="/loading" component={ Loading } />
          <Route exact path="/profile/edit" component={ ProfileEdit } />
          <Route component={ NotFound } />
        </Switch>
      </div>
    );
  }
}

export default App;
