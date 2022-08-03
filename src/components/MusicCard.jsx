import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import Loading from '../pages/Loading';
// import { addSong } from '../services/favoriteSongsAPI';

export default class MusicCard extends Component {
  // state = {
  //   loadingAPI: 'false',
  // }

  render() {
    const {
      track,
      track: { trackName, previewUrl, trackId },
      isFavorite, onChangeFavorite } = this.props;
    // const { loadingAPI } = this.state;
    // const { favorites } = this.state;
    // const isFavorite = favorites.some((favorite) => favorite.trackId === trackId);
    return (
      <div>
        {/* {loadingAPI === 'loading' && <Loading />} */}
        <p>{trackName}</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          {' '}
          <code>audio</code>
          .
        </audio>
        Favorita
        <input
          type="checkbox"
          data-testid={ `checkbox-music-${trackId}` }
          checked={ isFavorite }
          onChange={ () => onChangeFavorite(track, isFavorite) }
        />
      </div>
    );
  }
}

MusicCard.propTypes = {
  track: PropTypes.shape({
    trackName: PropTypes.string.isRequired,
    previewUrl: PropTypes.string.isRequired,
    trackId: PropTypes.number.isRequired,
  }).isRequired,
  isFavorite: PropTypes.bool.isRequired,
  // loadingAPI: PropTypes.string.isRequired,
  onChangeFavorite: PropTypes.func.isRequired,
};
