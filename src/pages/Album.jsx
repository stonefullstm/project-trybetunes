import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
// import Loading from './Loading';
import getMusics from '../services/musicsAPI';
import { getFavoriteSongs, addSong, removeSong } from '../services/favoriteSongsAPI';
import MusicCard from '../components/MusicCard';

export default class Album extends Component {
  state = {
    album: [],
    loadingAPI: 'false',
    favoriteSongs: [],
  };

  async componentDidMount() {
    const {
      match: { params: { id } },
    } = this.props;
    this.setState({
      loadingAPI: 'loading',
    }, async () => {
      const albumDetails = await getMusics(id);
      const favoriteMusics = await getFavoriteSongs();
      this.setState({
        album: [...albumDetails],
        favoriteSongs: [...favoriteMusics],
        loadingAPI: 'true',
      });
    });
  }

  onChangeFavorite = async (song, isFavorited) => {
    if (!isFavorited) {
      this.setState({
        loadingAPI: 'loading',
      }, async () => {
        await addSong(song);
        const favoriteMusics = await getFavoriteSongs();
        this.setState({
          loadingAPI: 'true',
          favoriteSongs: [...favoriteMusics],
        });
      });
    } else {
      this.setState({
        loadingAPI: 'loading',
      }, async () => {
        await removeSong(song);
        const favoriteMusics = await getFavoriteSongs();
        this.setState({
          loadingAPI: 'true',
          favoriteSongs: [...favoriteMusics],
        });
      });
    }
  }

  render() {
    const { album, loadingAPI, favoriteSongs } = this.state;
    const tracksList = album.filter((music) => music.kind === 'song');
    const musicsList = tracksList.map((track) => {
      const { trackId } = track;
      const isFavorite = favoriteSongs
        .some((favorite) => favorite.trackId === track.trackId);
      return (
        <div key={ trackId }>
          <div
            className="column"
          >
            <MusicCard
              track={ track }
              isFavorite={ isFavorite }
              onChangeFavorite={ this.onChangeFavorite }
              loadingAPI={ loadingAPI }
            />
          </div>
        </div>
      );
    });
    return (
      <div data-testid="page-album">
        <Header />
        <div className="columns is-centered">
          {loadingAPI === 'loading' && <span className="is-size-3 bulma-loader-mixin" />}
        </div>

        { album.length > 0 && (
          <section className="hero is-fullheight">
            <div className="columns is-centered">
              <div className="box has-text-centered">
                <img src={ album[0].artworkUrl100 } width="200px" alt="Imagem do album" />
                <p data-testid="artist-name">{album[0].artistName}</p>
                <p data-testid="album-name">{album[0].collectionName}</p>
              </div>
            </div>
            <div className="columns is-multiline is-centered">
              { musicsList }
            </div>
          </section>
        )}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
