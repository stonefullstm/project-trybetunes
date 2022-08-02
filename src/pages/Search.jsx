import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';

const MIN_LENGTH_NAME = 2;

export default class Search extends Component {
  state = {
    searchName: '',
    foundName: '',
    isArtistButtonDisabled: true,
    loadingAPI: 'false',
    albumsList: [],
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

  onArtistButtonClick = async () => {
    const { searchName } = this.state;
    let artistName = searchName;
    this.setState({
      loadingAPI: 'loading',
      searchName: '',
      foundName: '',
    }, async () => {
      const albumsList = await searchAlbumsAPI(artistName);
      artistName = albumsList.length > 0 ? searchName : '';
      this.setState({
        loadingAPI: 'true',
        albumsList,
        foundName: artistName,
      });
    });
  };

  render() {
    const {
      searchName,
      isArtistButtonDisabled,
      loadingAPI,
      albumsList,
      foundName } = this.state;
    const albumsListJSX = albumsList.map((album) => (
      <div key={ album.collectionId }>
        <img src={ album.artworkUrl100 } alt="imagem do album" />
        <p>{album.collectionName}</p>
        <Link
          to={ `/album/${album.collectionId}` }
          data-testid={ `link-to-album-${album.collectionId}` }
        >
          Mais detalhes

        </Link>
      </div>
    ));
    return (
      <div data-testid="page-search">
        <Header />
        {
          loadingAPI !== 'loading' ? (
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
                onClick={ this.onArtistButtonClick }
              >
                Pesquisar
              </button>
            </div>
          ) : (<Loading />)
        }
        {
          foundName !== '' && loadingAPI === 'true' && (
            <section>
              <p>
                {`Resultado de álbuns de: ${foundName}`}
              </p>
              {albumsListJSX}
            </section>
          )
        }
        {(
          foundName === ''
            && loadingAPI === 'true'
            && <p>Nenhum álbum foi encontrado</p>
        )}
      </div>
    );
  }
}
