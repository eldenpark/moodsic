import React from 'react';
import styled from '@emotion/styled';

const StyledPageTree = styled.div({
  flexShrink: 0,
  width: 180,
});

const PageTree = ({
  headings,
}) => {
  const listing = React.useMemo(() => {
    return headings.map((heading) => {
      return (
        <div key={heading}>{heading}</div>
      );
    });
  }, [headings]);

  return (
    <StyledPageTree>
      {listing}
    </StyledPageTree>
  );
};

export default PageTree;
