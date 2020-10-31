import React, { useEffect, useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import '../css/navbar.css';

const Navbar = () => {
   const [moviesTabClass, setMoviesTabClass] = useState(null);
   const [tvShowsTabClass, setTVShowsTabClass] = useState(null);
   const [history, setHistory] = useState(useHistory());

   const setActiveTabStyle = (tab) => {
      if (tab === 'movies') {
         setMoviesTabClass('nav-link current-tab');
         setTVShowsTabClass('nav-link');
      } else {
         setTVShowsTabClass('nav-link current-tab');
         setMoviesTabClass('nav-link');
      }
   };

   useEffect(() => {
      if (history.location.pathname === '/movies') setActiveTabStyle('movies');
      else setActiveTabStyle('tvshows');
   }, []);

   return (
      <div id='navbar-container'>
         <nav id='main-navigation'>
            <ul id='tabs'>
               <li>
                  <NavLink
                     className={moviesTabClass}
                     to='/movies'
                     onClick={() => setActiveTabStyle('movies')}
                  >
                     Movies
                  </NavLink>
               </li>
               <li>
                  <NavLink
                     className={tvShowsTabClass}
                     to='/tvshows'
                     onClick={() => setActiveTabStyle('tvshows')}
                  >
                     {' '}
                     TV Shows
                  </NavLink>
               </li>
            </ul>
         </nav>
      </div>
   );
};

export default Navbar;
