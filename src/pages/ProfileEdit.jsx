import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Loading from './Loading';
import { getUser, updateUser } from '../services/userAPI';

export default class ProfileEdit extends Component {
  state = {
    loadingAPI: 'false',
    editName: '',
    editEmail: '',
    editDescription: '',
    editImage: '',
  }

  componentDidMount() {
    this.setState({
      loadingAPI: 'loading',
    }, async () => {
      const user = await getUser();
      this.setState({
        loadingAPI: 'true',
        editName: user.name,
        editEmail: user.email,
        editDescription: user.description,
        editImage: user.image,
        isSaveButtonDisabled: true,
      });
    });
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    }, () => {
      const {
        editName,
        editEmail,
        editDescription,
        editImage,
      } = this.state;
      const regex = /\S+@\S+\.\S+/;
      const buttonIsDisabled = editName.length === 0
      || editEmail.length === 0 || editDescription.length === 0
      || editImage.length === 0 || !regex.test(editEmail);
      this.setState({
        isSaveButtonDisabled: buttonIsDisabled,
      });
    });
  }

  saveUser = async (event) => {
    event.preventDefault();
    const {
      editName,
      editEmail,
      editDescription,
      editImage,
    } = this.state;
    const { history } = this.props;
    await updateUser({ name: editName,
      email: editEmail,
      image: editImage,
      description: editDescription,
    });
    history.push('/profile');
  }

  render() {
    const { loadingAPI,
      editName,
      editEmail,
      editDescription,
      editImage,
      isSaveButtonDisabled } = this.state;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        <p>Editar perfil</p>
        {loadingAPI === 'loading' && <Loading />}
        <form className="update-form">
          <label htmlFor="editName">
            Nome
            <input
              type="text"
              data-testid="edit-input-name"
              name="editName"
              id="editName"
              value={ editName }
              onChange={ this.handleInputChange }
            />
          </label>
          <label htmlFor="editEmail">
            E-mail
            <input
              type="text"
              data-testid="edit-input-email"
              id="editEmail"
              name="editEmail"
              value={ editEmail }
              onChange={ this.handleInputChange }
            />
          </label>
          <label htmlFor="editDescription">
            Descrição
            <input
              type="textarea"
              data-testid="edit-input-description"
              id="editDescription"
              name="editDescription"
              value={ editDescription }
              onChange={ this.handleInputChange }
            />
          </label>
          <label htmlFor="editImage">
            Foto
            <input
              type="text"
              data-testid="edit-input-image"
              id="editImage"
              name="editImage"
              value={ editImage }
              onChange={ this.handleInputChange }
            />
          </label>
          <button
            type="submit"
            data-testid="edit-button-save"
            disabled={ isSaveButtonDisabled }
            onClick={ this.saveUser }
          >
            Salvar

          </button>
        </form>
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
