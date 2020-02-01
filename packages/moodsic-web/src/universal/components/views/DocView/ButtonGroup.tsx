import styled from '@emotion/styled';

const ButtonGroup = styled.div<any>((props) => ({
  display: 'flex',
  justifyContent: props.alignRight ? 'flex-end' : 'auto',
  marginBottom: '10px',
}));

export default ButtonGroup;
