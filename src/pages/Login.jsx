import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import Loading from './Loading';

export default class Login extends Component {
  loginCard = () => {
    const { loginName, isButtonDisabled, onChange, onClick, loadingAPI } = this.props;
    return (
      <div>
        <div
          data-testid="page-login"
          className="box"
        >
          <div className="field has-text-centered">
            <img
              src="/images/trybetunes.png"
              alt="logo"
              width="250px"
            />
          </div>
          <h3 className="title is-3">Login</h3>
          <div className="field">
            <input
              type="text"
              name="loginName"
              id="login-name"
              data-testid="login-name-input"
              value={ loginName }
              onChange={ onChange }
              placeholder="Nome"
              className="input mb-2"
            />
          </div>
          <div className="field">
            <button
              type="submit"
              name="loginButton"
              data-testid="login-submit-button"
              className={ loadingAPI
                ? 'button is-primary is-medium is-fullwidth is-loading'
                : 'button is-primary is-medium is-fullwidth' }
              disabled={ isButtonDisabled }
              onClick={ onClick }
            >
              Entrar
            </button>
          </div>

          {/* <div>
            {loadingAPI && <Loading />}
          </div> */}
        </div>

      </div>
    );
  }

  render() {
    // const { loadingAPI } = this.props;
    return (
      <div className="hero is-fullheight is-medium is-primary is-bold">
        <div className="hero-body">
          <div className="container">
            <div className="columns is-mobile is-centered">
              <div className="column is-5-tablet is-4-desktop is-3-widescreen">
                { this.loginCard() }
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginName: PropTypes.string.isRequired,
  isButtonDisabled: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  loadingAPI: PropTypes.bool.isRequired,
};
