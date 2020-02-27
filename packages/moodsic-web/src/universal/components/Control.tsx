import React from 'react';
import styled from '@emotion/styled';

const StyledControl = styled.div({
  display: 'flex',
  '& > *': {
    marginRight: 19,
  },
});

const Button = styled.div<any>(({ bgColor }) => ({
  alignItems: 'center',
  backgroundColor: bgColor,
  borderRadius: 8 ,
  cursor: 'pointer',
  display: 'flex',
  height: 40,
  justifyContent: 'center',
  marginBottom: 30,
  width: 150,
  '&:hover': {
    fontWeight: 600,
    transform: 'translate(2px,2px)',
  },
}));

const Submit = styled.input({
  alignItems: 'center',
  backgroundColor: '#FFA07A',
  borderRadius: 8,
  color: 'white',
  cursor: 'pointer',
  display: 'flex',
  fontSize: 20,
  justifyContent: 'center',
  height: 40,
  width: 210,
  '&:hover': {
    fontWeight: 600,
    transform: 'translate(2px,2px)',
  },
});

const Control: React.FC<any> = ({
  handleClickSubmit,
  startStop,
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
      <Submit
        onClick={handleClickSubmit}
        type="button"
        value={startStop}
      />
      <div>
        <Button
          bgColor="#f1819b"
          onClick={(e) => handleClickButton(e, 'happy')}
        >
          Happy
        </Button>
      </div>
      <div>
        <Button
          bgColor="#f7eead"
          onClick={(e) => handleClickButton(e, 'calm')}
        >
          Calm
        </Button>
      </div>
      <div>
        <Button
          bgColor="#28a8d8"
          onClick={(e) => handleClickButton(e, 'sad')}
        >
            Sad
        </Button>
      </div>
    </StyledControl>
  );
};

export default Control;
