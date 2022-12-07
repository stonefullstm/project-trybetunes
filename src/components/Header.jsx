import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
// import Loading from '../pages/Loading';

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
        className="panel is-primary"
      >
        <div
          className={ `panel-heading is-flex is-align-items-center
                  is-flex-direction-row is-justify-content-space-between` }
        >
          <img
            src="/images/trybe_transparente.png"
            alt="logo"
            width="150px"
            className=""
          />
          { loadingAPI === 'loading'
            ? <span className="is-size-3 bulma-loader-mixin" />
            : (
              <span
                data-testid="header-user-name"
                className="tag is-dark is-large is-rounded ml-5"
              >
                { `Usuário: ${userName}` }
              </span>)}
        </div>
        <nav
          className="tabs is-medium is-fullwidth is-boxed"
        >
          <ul>
            <li>
              <Link
                data-testid="link-to-search"
                to="/search"
              >
                Search

              </Link>

            </li>
            <li className="">

              <Link
                data-testid="link-to-favorites"
                to="/favorites"
                className=""
              >
                Favorites

              </Link>
            </li>
            <li className="">
              <Link
                data-testid="link-to-profile"
                to="/profile"
                className=""
              >
                Profile
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    );
  }
}
