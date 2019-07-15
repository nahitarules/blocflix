import React, { Component } from 'react';
import './App.css';
import Nav from './components/Nav'
import Search from './components/Search'
import MovieList from './components/MovieList'
import Pagination from './components/Pagination'
import MovieInfo from './components/MovieInfo'
import Popular from './components/Popular'

class App extends Component {
  constructor() {
    super()
    this.state = {
      movies: [],
      topMovies: [],
      searchTerm: '',
      totalResults: 0,
      currentPage: 1,
      currentMovie: null
    }
    this.apiKey = 'fb6a1d3f38c3d97f67df6d141f936f29'
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.state.searchTerm == '' ? fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${this.apiKey}&language=en-US&page=1`)
    .then(data => data.json())
    .then(data => {
      console.log(data);
      console.log('data');
      this.setState({movies: [...data.results] })
    }) :
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=${this.apiKey}&query=${this.state.searchTerm}`)
    .then(data => data.json())
    .then(data => {
      console.log(data);
      this.setState({ movies: [...data.results], totalResults: data.total_results})
    })
  }

  handleChange = (e) => {
    this.setState({ searchTerm: e.target.value})
  }

  componentDidMount (){
    fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${this.apiKey}&language=en-US&page=1`)
    .then(data => data.json())
    .then(data => {
      console.log(data);
      this.setState({topMovies: [...data.results] })
    })
  }

  nextPage = (pageNumber) => {
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=${this.apiKey}&query=${this.state.searchTerm}&page=${pageNumber}`)
    .then(data => data.json())
    .then(data => {
      console.log(data);
      this.setState({ movies: [...data.results], currentPage: pageNumber })
    })
  }
  viewMovieInfo = (id) => {
    const filteredMovie = this.state.movies.filter(movie => movie.id == id)

    const newCurrentMovie = filteredMovie.length > 0 ? filteredMovie[0] : null

    this.setState({currentMovie: newCurrentMovie})
  }

  closeMovieInfo = () => {
    this.setState({currentMovie: null})
  }
  render() {
    const numberPages = Math.floor(this.state.totalResults / 20);
    
    return (
      <div className="App">
        <Nav />
        
    {this.state.currentMovie == null && this.state.movies.length == 0 ? <div> <Search handleSubmit={this.handleSubmit} handleChange={this.handleChange} /> <MovieList viewMovieInfo={this.viewMovieInfo} movies={this.state.topMovies} /></div> : this.state.currentMovie == null ? <div><Search handleSubmit={this.handleSubmit} handleChange={this.handleChange} /> <MovieList viewMovieInfo={this.viewMovieInfo} movies={this.state.movies} /> </div> : <MovieInfo currentMovie={this.state.currentMovie}closeMovieInfo={this.closeMovieInfo} /> }
        { this.state.totalResults > 20 && this.state.currentMovie == null ? <Pagination pages={numberPages} nextPage={this.nextPage} currentPage={this.state.currentPage} /> : ''}
        
      </div>
    );
  } 
}

export default App;
