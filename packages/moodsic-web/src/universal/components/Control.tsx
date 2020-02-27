import React from 'react';
import styled from '@emotion/styled';

const StyledControl = styled.div({
  display: 'flex',
  '& > *': {
    marginRight: 19,
  },
});

const Button = styled.button<any>(({ bgColor }) => ({
  alignItems: 'center',
  backgroundColor: bgColor,
  borderRadius: 8,
  cursor: 'pointer',
  display: 'flex',
  fontSize: 15,
  height: 36,
  justifyContent: 'center',
  width: 100,
  '&:hover': {
    fontWeight: 800,
    transform: 'translate(1px,1px)',
  },
}));

const Submit = styled(Button)({
  backgroundColor: '#3c3938',
  color: 'white',
  width: 120,
});

const Left = styled.div({
  width: 230,
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
      <Left>
        <Submit
          onClick={handleClickSubmit}
          type="button"
        >
          {startStop}
        </Submit>
      </Left>
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
