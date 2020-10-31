import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import '../css/details.css';
import ReactPlayer from 'react-player';

const TVShowDetails = (props) => {
   const [id, setId] = useState(null);
   const { tvShow } = props.location.state;
   const [currentPath, setCurrentPath] = useState(props.location.pathname);
   const [prevPath, setPrevPath] = useState('');
   const [videoUrl, setVideoUrl] = useState(null);

   useEffect(() => {
      let id = props.match.params.id;
      setId(id);
   }, [id, props.match.params.id]);

   useEffect(() => {
      setPrevPath('/' + currentPath.split('/')[1]);
   }, [currentPath]);

   const getTVShowTrailerUrl = async () => {
      let response = await fetch(
         'https://api.themoviedb.org/3/tv/' +
            tvShow.id +
            '/videos?api_key=041d9cd3501933c52b6696c13f0d60a7',
         {
            method: 'GET',
         }
      );
      response = await response.json();

      const videos = response.results;

      if (videos.length >= 1) {
         setVideoUrl('https://www.youtube.com/watch?v=' + videos[0].key);
      }
   };

   useEffect(() => {
      window.scrollTo(0, 0)
      getTVShowTrailerUrl();
   }, []);

   return (
      <div id='details-container'>
         <div id='image-wrapper'>
            <img
               src={'https://image.tmdb.org/t/p/w500' + tvShow.poster_path}
               alt='Not found...'
            ></img>
         </div>

         <div id='title-wrapper'>
            <h4>{tvShow.name}</h4>
         </div>

         <div id='goback-wrapper'>
            <div class='outer'>
               <div class='inner'>
                  <NavLink
                     id='goback-link'
                     onClick={() =>
                        props.handleModalVisibility(!props.modalVisible)
                     }
                     to={prevPath}
                  >
                     GO BACK
                  </NavLink>
               </div>
            </div>
         </div>

         <div id='overview-wrapper'>
            <p>
               <span class='fa fa-star star'></span>
               {' ' + tvShow.overview}
            </p>
         </div>

         {videoUrl ? (
            <div id='video-wrapper'>
               <ReactPlayer id='player' url={videoUrl}></ReactPlayer>
            </div>
         ) : (
            <div id='video-wrapper'>
               <img
                  id='alternative-image'
                  src={'https://image.tmdb.org/t/p/w500' + tvShow.poster_path}
                  alt='Not found...'
               ></img>
            </div>
         )}
      </div>
   );
};

export default TVShowDetails;
