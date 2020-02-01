import styled from '@emotion/styled';

const Button = styled.button({
  '&:hover': {
    boxShadow: '0 2px 3px rgba(0, 0, 0, 0.15)',
    transform: 'translateY(1px)',
  },
  border: '2px solid',
  borderRadius: '5px',
  cursor: 'pointer',
  fontSize: '1rem',
  padding: '0.25rem 1rem',
});

export default Button;
