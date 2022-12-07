import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class MusicCard extends Component {
  render() {
    const {
      track,
      track: { trackName, previewUrl, trackId },
      isFavorite, onChangeFavorite } = this.props;

    return (
      <div className="card has-background-grey-light">
        <div className="card-content">
          <p className="content">{trackName}</p>
          <audio
            className="content"
            data-testid="audio-component"
            src={ previewUrl }
            controls
          >
            <track kind="captions" />
            O seu navegador não suporta o elemento.
            <code>audio</code>
          </audio>
        </div>
        <div className="card-footer">
          <div
            className="card-footer-item"
            onClick={ () => onChangeFavorite(track, isFavorite) }
            onKeyDown={ () => {} }
            role="button"
            tabIndex="0"
          >
            <img
              data-testid={ `checkbox-music-${trackId}` }
              src={ isFavorite ? '/images/favorito.png' : '/images/coracao-favorito.png' }
              width="25px"
              alt="Favorita"
            />
          </div>
        </div>
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
  onChangeFavorite: PropTypes.func.isRequired,
  // loadingAPI: PropTypes.string.isRequired,
};
