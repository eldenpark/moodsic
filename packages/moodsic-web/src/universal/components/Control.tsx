import React from 'react';
import styled from '@emotion/styled';

import {
  FormType,
} from '@@src/universal/components/types';

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
  startStopState,
}) => {
  const handleClickButton = React.useCallback((e, label) => {
    const form = document.getElementById('form') as FormType;
    const index = form.labels.indexOf(label);
    console.log('Control(): only playing index: %s, label: %s, sources: %o, labels: %o', index, label, form.sources, form.labels);

    form.sources.forEach((source, idx) => {
      if (idx !== index) {
        console.log('Control(): source at: %s will stop', idx);
        source.stop(0);
      } else {
        console.log('Control(): found the source of index: %s', idx);
        const label: any = document.getElementById(`classification-${idx}`);
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
          {startStopState.current}
        </Submit>
      </Left>
      <div>
        <Button
          bgColor="#f1819b"
          onClick={(e) => handleClickButton(e, 'happy')}
          type="button"
        >
          Happy
        </Button>
      </div>
      <div>
        <Button
          bgColor="#f7eead"
          onClick={(e) => handleClickButton(e, 'calm')}
          type="button"
        >
          Calm
        </Button>
      </div>
      <div>
        <Button
          bgColor="#28a8d8"
          onClick={(e) => handleClickButton(e, 'sad')}
          type="button"
        >
            Sad
        </Button>
      </div>
    </StyledControl>
  );
};

export default Control;
