import { useState } from 'react';
import Navbar from './Navbar';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Movies from './Movies';
import TVShows from './TVShows';
import MovieDetails from './MovieDetails';
import TVShowDetails from './TVShowDetails';
import SearchBar from './SearchBar';
import MoviesContextProvider from '../contexts/MoviesContext';
import TVShowsContextProvider from '../contexts/TVShowsContext';
import SearchContextProvider from '../contexts/SearchContext';

const App = () => {
   const [modalVisible, setModalVisible] = useState(false);

   const handleModalVisibility = (modalVisibility) => {
      setModalVisible(modalVisibility);
   };

   return (
      <div id='app-container'>
         <BrowserRouter>
            <SearchContextProvider>
               {modalVisible ? (
                  <Switch>
                     <Route
                        exact
                        path='/movies/details/:id'
                        render={(props) => (
                           <MovieDetails
                              {...props}
                              modalVisible={modalVisible}
                              handleModalVisibility={handleModalVisibility}
                           />
                        )}
                     ></Route>
                     <Route
                        exact
                        path='/tvshows/details/:id'
                        render={(props) => (
                           <TVShowDetails
                              {...props}
                              modalVisible={modalVisible}
                              handleModalVisibility={handleModalVisibility}
                           />
                        )}
                     ></Route>
                  </Switch>
               ) : (
                  <MoviesContextProvider>
                     <TVShowsContextProvider>
                        <Navbar />
                        <SearchBar />

                        <Switch>
                           <Redirect exact from='/' to='/tvshows' />
                           <Route
                              exact
                              path='/movies'
                              render={() => (
                                 <Movies
                                    modalVisible={modalVisible}
                                    handleModalVisibility={
                                       handleModalVisibility
                                    }
                                 />
                              )}
                           />
                           <Route
                              exact
                              path='/tvshows'
                              render={() => (
                                 <TVShows
                                    modalVisible={modalVisible}
                                    handleModalVisibility={
                                       handleModalVisibility
                                    }
                                 />
                              )}
                           />
                        </Switch>
                     </TVShowsContextProvider>
                  </MoviesContextProvider>
               )}
            </SearchContextProvider>
         </BrowserRouter>
      </div>
   );
};

export default App;
