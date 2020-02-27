import { compose } from 'redux';
import { css, Global } from '@emotion/core';
import { hot } from 'react-hot-loader/root';
import React from 'react';
import styled from '@emotion/styled';

import Main from './Main';

const customStyle = css({
  '*': {
    boxSizing: 'border-box',
    color: 'black',
  },
  a: {
    textDecoration: 'none',
  },
  body: {
  },
  button: {
    border: 0,
  },
  input: {
    border: 'none',
    outline: 'none',
  },
  p: {
    margin: 0,
  },
});

const StyledUniversal = styled.div({
  display: 'flex',
  fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif;',
  fontSize: 14,
  justifyContent: 'center',
  paddingTop: 40,
});

const Universal: React.FC<any> = () => {
  return (
    <StyledUniversal>
      <Main />
      <Global
        styles={customStyle}
      />
    </StyledUniversal>
  );
};

export default compose(
  hot,
)(Universal);

declare global {
  interface Window {
    SimpleMDE;
  }
}
