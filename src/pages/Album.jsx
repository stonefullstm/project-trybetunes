import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Loading from './Loading';
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
      return (<MusicCard
        key={ trackId }
        track={ track }
        isFavorite={ isFavorite }
        onChangeFavorite={ this.onChangeFavorite }
        loadingAPI={ loadingAPI }
      />);
    });
    return (
      <div data-testid="page-album">
        <Header />
        { album.length > 0 && (
          <section>
            {loadingAPI === 'loading' && <Loading />}
            <p data-testid="artist-name">{album[0].artistName}</p>
            <p data-testid="album-name">{album[0].collectionName}</p>
            <div>
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
