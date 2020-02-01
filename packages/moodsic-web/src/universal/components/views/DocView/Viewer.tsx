import marked from 'marked';
import React from 'react';
import styled from '@emotion/styled';

const StyledViewer = styled.div({
  width: 800,
});

const Viewer = ({
  content,
}) => {
  const html = React.useMemo(() => {
    return {
      __html: marked(content),
    };
  }, [content]);

  return (
    <StyledViewer dangerouslySetInnerHTML={html} />
  );
};

export default Viewer;
