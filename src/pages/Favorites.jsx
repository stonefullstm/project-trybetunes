import React, { Component } from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import Loading from './Loading';
import { removeSong, getFavoriteSongs } from '../services/favoriteSongsAPI';

export default class Favorites extends Component {
  state = {
    loadingAPI: 'false',
    favoriteSongs: [],
  };

  async componentDidMount() {
    this.setState({
      loadingAPI: 'loading',
    }, async () => {
      const favoriteMusics = await getFavoriteSongs();
      this.setState({
        favoriteSongs: [...favoriteMusics],
        loadingAPI: 'true',
      });
    });
  }

  onChangeFavorite = async (song) => {
    console.log(song);
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

  render() {
    const { favoriteSongs, loadingAPI } = this.state;
    const verdadeiro = true;
    const musicsList = favoriteSongs.map((track) => {
      const { trackId } = track;
      return (<MusicCard
        key={ trackId }
        track={ track }
        isFavorite={ verdadeiro }
        onChangeFavorite={ this.onChangeFavorite }
        loadingAPI={ loadingAPI }
      />);
    });

    return (
      <div data-testid="page-favorites">
        <Header />
        {loadingAPI === 'loading' && <Loading />}
        <div>
          {musicsList}
        </div>
      </div>
    );
  }
}
