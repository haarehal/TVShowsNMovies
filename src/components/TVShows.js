import React, { useEffect, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { TVShowsContext } from '../contexts/TVShowsContext';
import { SearchContext } from '../contexts/SearchContext';
import '../css/items.css';

const TVShows = ({ modalVisible, handleModalVisibility }) => {
   const {
      topTVShows,
      filteredTVShows,
      showTopTVShows,
      getFilteredTVShows,
   } = useContext(TVShowsContext);
   const { term, setCurrentPath } = useContext(SearchContext);

   useEffect(() => {
      if (term !== '') getFilteredTVShows(term);
      setCurrentPath('/tvshows');
   }, []);

   return (
      <div className='items-container'>
         {showTopTVShows
            ? topTVShows.map((tvShow) => {
                 return (
                    <NavLink
                       key={tvShow.id}
                       className='item'
                       onClick={() => handleModalVisibility(!modalVisible)}
                       to={{
                          pathname: '/tvshows/details/' + tvShow.id,
                          state: { tvShow: tvShow },
                       }}
                    >
                       <div className='image-wrapper'>
                          <img
                             src={
                                'https://image.tmdb.org/t/p/w500' +
                                tvShow.poster_path
                             }
                             alt='Not found...'
                          ></img>
                       </div>
                       <div className='item-title-wrapper'>{tvShow.name}</div>
                    </NavLink>
                 );
              })
            : filteredTVShows.map((tvShow) => {
                 return (
                    <NavLink
                       key={tvShow.id}
                       className='item'
                       onClick={() => handleModalVisibility(!modalVisible)}
                       to={{
                          pathname: '/tvshows/details/' + tvShow.id,
                          state: { tvShow: tvShow },
                       }}
                    >
                       <div className='image-wrapper'>
                          <img
                             src={
                                'https://image.tmdb.org/t/p/w500' +
                                tvShow.poster_path
                             }
                             alt='Not found...'
                          ></img>
                       </div>
                       <div className='item-title-wrapper'>{tvShow.name}</div>
                    </NavLink>
                 );
              })}
      </div>
   );
};

export default TVShows;
