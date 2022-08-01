import React, { Component } from 'react';
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
              <h1>TrybeTunes</h1>
              <span data-testid="header-user-name">{ userName }</span>
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
