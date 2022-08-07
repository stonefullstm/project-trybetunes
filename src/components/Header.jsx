import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from '../pages/Loading';

export default class Header extends Component {
  state = {
    userName: '',
    loadingAPI: 'false',
  }

  async componentDidMount() {
    this.setState({
      loadingAPI: 'loading',
    }, async () => {
      const user = await getUser();
      const { name } = user;
      this.setState({
        loadingAPI: 'true',
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
          loadingAPI !== 'loading' ? (
            <div>
              <div className="titulo">
                <h1 className="logo">TrybeTunes</h1>
                <span
                  className="usuario-titulo"
                  data-testid="header-user-name"
                >
                  { `${userName}` }

                </span>
              </div>
              <nav className="link-navegacao">
                <div className="search-link">
                  <Link
                    data-testid="link-to-search"
                    to="/search"
                  >

                    Search

                  </Link>
                </div>
                <Link
                  className="favorites-link"
                  data-testid="link-to-favorites"
                  to="/favorites"
                >
                  Favorites

                </Link>
                <Link
                  className="profile-link"
                  data-testid="link-to-profile"
                  to="/profile"
                >
                  Profile

                </Link>

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
