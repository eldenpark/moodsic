import React from 'react';
import styled from '@emotion/styled';

const StyledSearch = styled.div({
  display: 'flex',
  justifyContent: 'center',
});

const SearchBar = styled.input({
  border: '1px solid #dfe1e5',
  borderRadius: 25,
  height: 47,
  padding: '16px 30px',
  width: 490,
});

const Search = () => {
  return (
    <StyledSearch>
      <SearchBar
        placeholder="Search something..."
      />
    </StyledSearch>
  );
};

export default Search;
