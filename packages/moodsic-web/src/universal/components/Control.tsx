import React from 'react';
import styled from '@emotion/styled';

const StyledControl = styled.div({
  display: 'flex',
  '& > *': {
    marginRight: 19,
  },
});

const Button = styled.div({
  alignItems: 'center',
  backgroundColor: '#28d8b7',
  borderRadius: 8 ,
  cursor: 'pointer',
  display: 'flex',
  height: 40,
  justifyContent: 'center',
  marginBottom: 30,
  width: 150,
'&  :hover': {
    fontWeight: 600,
    transform: 'translate(2px,2px)',
  },
});

const Control: React.FC = ({
  children,
}) => {
  const handleClickButton = React.useCallback((e, label) => {
    const form: any = document.getElementById('form');
    const index = form.labels.indexOf(label);
    console.log('Control(): only playing index: %s', index);

    form.sources.forEach((source, idx) => {
      if (idx !== index) {
        console.log('Control(): source at: %s will stop', idx);
        source.stop(0);
      } else {
        const label: any = document.getElementById(`label-${idx}`);
        label.classList.add('focus');
      }
    });
  }, []);

  return (
    <StyledControl>
      {children}
      <div>
        <Button onClick={(e) => handleClickButton(e, 'happy')}>
          Happy
        </Button>
      </div>
      <div>
        <Button onClick={(e) => handleClickButton(e, 'calm')}>
          Calm
        </Button>
      </div>
      <div>
      <Button onClick={(e) => handleClickButton(e, 'sad')}>
          Sad
        </Button>
      </div>
    </StyledControl>
  );
};

export default Control;
