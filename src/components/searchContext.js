import React, { useState } from "react";

export const SearchContext = React.createContext();

export const SearchContextProvider = (props) => {
  const [searchValue, setSearchValue] = useState("");
  return (
    <SearchContext.Provider value={[searchValue, setSearchValue]}>
      {props.children}
    </SearchContext.Provider>
  );
};
