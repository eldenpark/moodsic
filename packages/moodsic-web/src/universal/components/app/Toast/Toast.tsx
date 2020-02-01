import React from 'react';
import styled from '@emotion/styled';

const StyledToast = styled.div({
  alignItems: 'center',
  backgroundColor: '#343442',
  color: 'white',
  display: 'flex',
  fontWeight: 800,
  height: 50,
  padding: '0 30px',
});

const Toast = ({
  label = '',
}) => {
  if (label.length > 0) {
    return (
      <StyledToast>
        {label}
      </StyledToast>
    );
  }

  return null;
};

export default Toast;
