import React, { useEffect, useContext } from 'react';
import { SearchContext } from '../contexts/SearchContext';
import { MoviesContext } from '../contexts/MoviesContext';
import { TVShowsContext } from '../contexts/TVShowsContext';
import { withRouter } from 'react-router-dom';
import '../css/searchbar.css';

const SearchBar = () => {
   const { term, currentPath, setTerm } = useContext(SearchContext);
   const { getFilteredMovies, changeMoviesAppereance } = useContext(
      MoviesContext
   );
   const { getFilteredTVShows, changeTVShowsAppereance } = useContext(
      TVShowsContext
   );

   const handleInputChange = (e) => {
      setTerm(e.target.value);
   };

   useEffect(() => {
      if (term.length >= 3) {
         const timeout = setTimeout(() => {
            /* let query = term.split(" ");
                query = query.filter(q => q !== "");

                if (query.length > 1) {
                    query = query.toString();
                    query = query.replace(new RegExp("\\,", "g"), '+');
                } */

            if (currentPath === '/movies') getFilteredMovies(term);
            else getFilteredTVShows(term);
         }, 1000);

         return () => clearTimeout(timeout);
      } else {
         if (currentPath === '/movies') changeMoviesAppereance(true);
         else changeTVShowsAppereance(true);
      }
   }, [term]);

   return (
      <div id='search-container'>
         <input
            type='text'
            value={term}
            onChange={handleInputChange}
            placeholder='Search by name...'
         ></input>
      </div>
   );
};

export default withRouter(SearchBar);
