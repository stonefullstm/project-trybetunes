import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from '../pages/Loading';

export default class Header extends Component {
  state = {
    userName: '',
  }

  async componentDidMount() {
    this.setState({
      loadingAPI: true,
    }, async () => {
      const user = await getUser();
      const { name } = user;
      this.setState({
        loadingAPI: false,
        userName: name,
      });
    });
  }

  render() {
    const { userName, loadingAPI } = this.state;
    return (
      <header
        data-testid="header-component"
      >
        {
          !loadingAPI ? (
            <div>
              <div className="titulo">
                <h1>TrybeTunes</h1>
                <span data-testid="header-user-name">{ userName }</span>
              </div>
              <nav>
                <Link data-testid="link-to-search" to="/search">Search</Link>
                <Link data-testid="link-to-favorites" to="/favorites">Favorites</Link>
                <Link data-testid="link-to-profile" to="/profile">Profile</Link>

              </nav>
            </div>
          ) : (
            <div>
              <Loading />
            </div>
          )
        }
      </header>
    );
  }
}
