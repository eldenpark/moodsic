import { compose } from 'redux';
import { css, Global } from '@emotion/core';
import { hot } from 'react-hot-loader/root';
import React from 'react';
import styled from '@emotion/styled';

import ErrorBoundary from '@@src/universal/components/app/Error/ErrorBoundary';
import normalize from '@@src/universal/styles/normalize';

const normalizeStyle = css`
  ${normalize}
`;

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
  input: {
    border: 'none',
    outline: 'none',
  },
  p: {
    margin: 0,
  },
});

const StyledUniversal = styled.div({
  fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif;',
});

const Hyunjae = styled.div({
  border: `1px solid black`
});

const Universal: React.FC<any> = () => {
  return (
    <StyledUniversal>
      <ErrorBoundary>
        <Hyunjae>
          power
        </Hyunjae>
        <Global
          styles={normalizeStyle}
        />
        <Global
          styles={customStyle}
        />
        <div>
          w
        </div>
      </ErrorBoundary>
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
