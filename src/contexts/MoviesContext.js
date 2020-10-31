import React, { createContext, Component } from 'react';

export const MoviesContext = createContext();

class MoviesContextProvider extends Component {
   state = {
      topMovies: [],
      filteredMovies: [],
      showTopMovies: true,
   };

   getTopMovies = async () => {
      let response = await fetch(
         'https://api.themoviedb.org/3/movie/top_rated?api_key=041d9cd3501933c52b6696c13f0d60a7',
         {
            method: 'GET',
         }
      );
      response = await response.json();

      const movies = response.results.slice(0, 10);

      this.setState({
         topMovies: movies,
      });
   };

   getFilteredMovies = async (query) => {
      let response = await fetch(
         'https://api.themoviedb.org/3/search/movie?api_key=041d9cd3501933c52b6696c13f0d60a7&query=' +
            query,
         {
            method: 'GET',
         }
      );
      response = await response.json();

      const movies = response.results;

      this.setState({
         filteredMovies: movies,
         showTopMovies: false,
      });
   };

   changeMoviesAppereance = (isTrue) => {
      this.setState({
         showTopMovies: isTrue,
      });
   };

   setFilteredMovies = (movies) => {
      this.setState({
         filteredMovies: movies,
      });
   };

   componentDidMount() {
      this.getTopMovies();
   }

   render() {
      return (
         <MoviesContext.Provider
            value={{
               ...this.state,
               getTopMovies: this.getTopMovies,
               getFilteredMovies: this.getFilteredMovies,
               changeMoviesAppereance: this.changeMoviesAppereance,
               setFilteredMovies: this.setFilteredMovies
            }}
         >
            {this.props.children}
         </MoviesContext.Provider>
      );
   }
}

export default MoviesContextProvider;
