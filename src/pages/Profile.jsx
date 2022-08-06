import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from './Loading';
import { getUser } from '../services/userAPI';

export default class Profile extends Component {
  state = {
    loadingAPI: 'loading',
    dataUser: {},
  };

  componentDidMount = async () => {
    const user = await getUser();
    this.setState({
    //   loadingAPI: 'loading',
    // }, async () => {
      // const user = await getUser();
      // this.setState(() => ({
      loadingAPI: 'true',
      dataUser: user,
      // }));
    });
  }

  render() {
    const { loadingAPI, dataUser: { name, email, description, image } } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        {
          loadingAPI !== 'loading' ? (
            <section className="data-user">
              <img data-testid="profile-image" src={ image } alt="foto do usuário" />
              <div>
                <p>{name}</p>
                <p>{email}</p>
                <p>{description}</p>
              </div>
              <Link to="/profile/edit">
                <button type="button">Editar perfil</button>
              </Link>

            </section>
          ) : (<Loading />)
        }
      </div>
    );
  }
}
