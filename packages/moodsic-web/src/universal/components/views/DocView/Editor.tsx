import React from 'react';
import styled from '@emotion/styled';

const StyledEditor = styled.div({
  width: 800,
});

const Editor = ({
  content,
  registerEditor,
}) => {
  const textareaEl = React.useRef(null);
  React.useEffect(() => {
    if (textareaEl.current) {
      const editor = new window.SimpleMDE({ // eslint-disable-line
        element: textareaEl.current,
        initialValue: content,
        status: false,
      });

      if (registerEditor) {
        registerEditor(editor);
      }
    }
  }, [registerEditor]);

  return (
    <StyledEditor>
      <textarea
        ref={textareaEl}
      />
    </StyledEditor>
  );
};

export default Editor;
