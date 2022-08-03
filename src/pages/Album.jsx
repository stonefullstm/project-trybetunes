import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

export default class Album extends Component {
  state = {
    album: [],
  };

  async componentDidMount() {
    const {
      match: { params: { id } },
    } = this.props;
    const albumDetails = await getMusics(id);
    this.setState({
      album: [...albumDetails],
    });
  }

  render() {
    // const { match: { params: id } } = this.props;
    const { album } = this.state;
    const tracksList = album.filter((music) => music.kind === 'song');
    const musicsList = tracksList.map((track) => {
      const { trackId } = track;
      return (<MusicCard
        key={ trackId }
        // trackName={ track.trackName }
        // previewUrl={ track.previewUrl }
        // trackId={ track.trackId }
        track={ track }
      />);
    });
    return (
      <div data-testid="page-album">
        <Header />
        { album.length > 0 && (
          <section>
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
