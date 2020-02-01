import React from 'react';
import styled from '@emotion/styled';

const StyledLeftBar = styled.div({
  fontSize: '1.1em',
  padding: '55px 0 0 30px',
  width: 200,
});

const StyledLeftBarEntry = styled.div({
  '&:hover': {
    fontWeight: 600,
  },
  cursor: 'pointer',
  paddingBottom: 5,
});

const LeftBarEntry = ({
  handleClickEntry,
  label,
  url,
}) => {
  return (
    <StyledLeftBarEntry
      data-url={url}
      onClick={handleClickEntry}
      role="button"
      tabIndex={0}
    >
      {label}
    </StyledLeftBarEntry>
  );
};

const LeftBar = ({
  handleClickEntry,
}) => {
  return (
    <StyledLeftBar>
      <LeftBarEntry
        handleClickEntry={handleClickEntry}
        label="Home"
        url="/"
      />
      <LeftBarEntry
        handleClickEntry={handleClickEntry}
        label="Documents"
        url="/docs"
      />
    </StyledLeftBar>
  );
};

export default LeftBar;
