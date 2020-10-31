import React, { createContext, Component } from 'react';

export const TVShowsContext = createContext();

class TVShowsContextProvider extends Component {
   state = {
      topTVShows: [],
      filteredTVShows: [],
      showTopTVShows: true,
   };

   getTopTVShows = async () => {
      let response = await fetch(
         'https://api.themoviedb.org/3/tv/top_rated?api_key=041d9cd3501933c52b6696c13f0d60a7',
         {
            method: 'GET',
         }
      );
      response = await response.json();

      const tvShows = response.results.slice(0, 10);

      this.setState({
         topTVShows: tvShows,
      });
   };

   getFilteredTVShows = async (query) => {
      let response = await fetch(
         'https://api.themoviedb.org/3/search/tv?api_key=041d9cd3501933c52b6696c13f0d60a7&query=' +
            query,
         {
            method: 'GET',
         }
      );
      response = await response.json();

      const tvShows = response.results;

      this.setState({
         filteredTVShows: tvShows,
         showTopTVShows: false,
      });
   };

   changeTVShowsAppereance = (isTrue) => {
      this.setState({
         showTopTVShows: isTrue,
      });
   };

   setFilteredTVShows = (tvShows) => {
      this.setState({
         filteredTVShows: tvShows,
      });
   };

   componentDidMount() {
      this.getTopTVShows();
   }

   render() {
      return (
         <TVShowsContext.Provider
            value={{
               ...this.state,
               getTopTVShows: this.getTopTVShows,
               getFilteredTVShows: this.getFilteredTVShows,
               changeTVShowsAppereance: this.changeTVShowsAppereance,
               setFilteredTVShows: this.setFilteredTVShows,
            }}
         >
            {this.props.children}
         </TVShowsContext.Provider>
      );
   }
}

export default TVShowsContextProvider;
