import React, { createContext, Component } from 'react';

export const SearchContext = createContext();

class SearchContextProvider extends Component {
   state = {
      term: '',
      currentPath: '',
   };

   setTerm = (txt) => {
      this.setState({
         term: txt,
      });
   };

   setCurrentPath = (path) => {
      this.setState({
         currentPath: path,
      });
   };

   render() {
      return (
         <SearchContext.Provider
            value={{
               ...this.state,
               setTerm: this.setTerm,
               setCurrentPath: this.setCurrentPath,
            }}
         >
            {this.props.children}
         </SearchContext.Provider>
      );
   }
}

export default SearchContextProvider;
