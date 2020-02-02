import React from 'react';
import styled from '@emotion/styled';

const StyledControl = styled.div({
  marginLeft: 80,
});

const Upper = styled.div({
  display: 'flex',
  flexDirection: 'column',
  height: 300,
  width: 280,
});

const Button = styled.div({
  alignItems: 'center',
  backgroundColor: '#28d8b7',
  borderRadius: '8px',
  boxShadow: "1px 3px 4px rgba(0,0,0,0.2),0px -5px 35px rgba(255,255,255,0.3)",
  cursor: 'pointer',
  display: 'flex',
  height: 50,
  justifyContent: 'center',
  marginBottom: 30,
  width: 150,
});

const Control = () => {
  return (
    <StyledControl>
      <Upper>
        <div>
          <Button>
            Happy
          </Button>
        </div>
        <div>
          <Button>
            Calm
          </Button>
        </div>
        <div>
          <Button>
            Sad
          </Button>
        </div>
      </Upper>
    </StyledControl>
  );
};

export default Control;
