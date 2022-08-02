import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import Header from '../components/Header';

const MIN_LENGTH_NAME = 2;

export default class Search extends Component {
  state = {
    searchName: '',
    isArtistButtonDisabled: true,
  }

  onArtistInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    }, this.enableButton);
  };

  enableButton = () => {
    const { searchName } = this.state;
    const isDisabled = (searchName.length < MIN_LENGTH_NAME);
    this.setState({
      isArtistButtonDisabled: isDisabled,
    });
  };

  render() {
    const { searchName, isArtistButtonDisabled } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <div>
          <label htmlFor="search-name">
            Nome:
            <input
              type="text"
              name="searchName"
              id="search-name"
              data-testid="search-artist-input"
              value={ searchName }
              onChange={ this.onArtistInputChange }
            />
          </label>
          <button
            type="submit"
            name="searchButton"
            data-testid="search-artist-button"
            disabled={ isArtistButtonDisabled }
            // onClick={ onArtistButtonClick }
          >
            Pesquisar
          </button>
        </div>
      </div>
    );
  }
}
