import React from 'react';
import styled from '@emotion/styled';

const StyledDocTree = styled.div({
  border: '1px solid green',
  flexShrink: 0,
  width: 160,
});

const DocTree = () => {
  return (
    <StyledDocTree>doc tree</StyledDocTree>
  );
};

export default DocTree;
