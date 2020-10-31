import React, { useState, useEffect, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { MoviesContext } from '../contexts/MoviesContext';
import { SearchContext } from '../contexts/SearchContext';
import '../css/items.css';

const Movies = ({ modalVisible, handleModalVisibility }) => {
   const {
      topMovies,
      filteredMovies,
      showTopMovies,
      getFilteredMovies,
   } = useContext(MoviesContext);
   const { term, setCurrentPath } = useContext(SearchContext);

   useEffect(() => {
      if (term !== '') getFilteredMovies(term);
      setCurrentPath('/movies');
   }, []);

   return (
      <div className='items-container'>
         {showTopMovies
            ? topMovies.map((movie) => {
                 return (
                    <NavLink
                       key={movie.id}
                       className='item'
                       onClick={() => handleModalVisibility(!modalVisible)}
                       to={{
                          pathname: '/movies/details/' + movie.id,
                          state: { movie: movie },
                       }}
                    >
                       <div className='image-wrapper'>
                          <img
                             src={
                                'https://image.tmdb.org/t/p/w500' +
                                movie.poster_path
                             }
                             alt='Not found...'
                          />
                       </div>
                       <div className='item-title-wrapper'>{movie.title}</div>
                    </NavLink>
                 );
              })
            : filteredMovies.map((movie) => {
                 return (
                    <NavLink
                       key={movie.id}
                       className='item'
                       onClick={() => handleModalVisibility(!modalVisible)}
                       to={{
                          pathname: '/movies/details/' + movie.id,
                          state: { movie: movie },
                       }}
                    >
                       <div className='image-wrapper'>
                          <img
                             src={
                                'https://image.tmdb.org/t/p/w500' +
                                movie.poster_path
                             }
                             alt='Not found...'
                          ></img>
                       </div>
                       <div className='item-title-wrapper'>{movie.title}</div>
                    </NavLink>
                 );
              })}
      </div>
   );
};

export default Movies;
