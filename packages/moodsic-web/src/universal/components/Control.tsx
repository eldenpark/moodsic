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
      <Upper>
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
      </Upper>
    </StyledControl>
  );
};

export default Control;
