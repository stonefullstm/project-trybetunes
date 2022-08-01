import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';

export default class Login extends Component {
  render() {
    const { loginName, isButtonDisabled, onChange, onClick, loadingAPI } = this.props;
    return (
      <div data-testid="page-login">
        <div>
          <label htmlFor="login-name">
            Nome:
            <input
              type="text"
              name="loginName"
              id="login-name"
              data-testid="login-name-input"
              value={ loginName }
              onChange={ onChange }
            />
          </label>
          <button
            type="submit"
            name="loginButton"
            data-testid="login-submit-button"
            disabled={ isButtonDisabled }
            onClick={ onClick }
          >
            Entrar
          </button>
        </div>
        <div>
          {loadingAPI && <Loading />}
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
