import React from 'react';
import styled from '@emotion/styled';

const StyledAbout = styled.div({
  lineHeight: 1.3,
  marginTop: 55,
  '& a': {
    color: '#966be6',
  },
  '& a:hover': {
    color: '#7246c5',
  },
});

const Top = styled.div({
});

const Bottom = styled.div({
  alignItems: 'center',
  display: 'flex',
  '& img': {
    height: 55,
  },
  '& > div:last-child': {
    marginLeft: 45,
  },
});

const H1 = styled.div({
  fontSize: 15,
  fontWeight: 500,
  margin: '10 0'
});

const P = styled.p({
  marginBottom: 11,
});

const About = ({
}) => {
  return (
    <StyledAbout>
      <Top>
        <div>
          <H1>
            Moodsic: Mood Classification Using Spectrograms of Sound
          </H1>
          <P>
            Moodsic classifies your sound of choice according to its mood.
            It generates a spectrogram of your sound then feeds it into a convolutional neural network flavored model we trained.
            The project also explores the power of cloud based machine intelligence. See the <a href="http://github.com/eldeni/moodsic">documentation</a> to learn more.
          </P>
          <P>
            This is a demo page and the application is set to process pre-determined 3 songs. Click Start or Start Over to launch or stop the application.
            Once it gets the classification result, you can then listen to a song of specific mood by clicking the emotion.
          </P>
        </div>
      </Top>
      <Bottom>
        <div>
          <img
            alt="logo-moodsic"
            src="/moodsic/assets/logo-moodsic.png"
          />
          <img
            alt="logo-moodsic"
            src="/moodsic/assets/logo-sound-therapy.png"
          />
        </div>
        <div>
          <p>
            <a href="https://github.com/eldeni/moodsic/">Github</a>
          </p>
          <p>
            Moodsic 2020
          </p>
        </div>
      </Bottom>
    </StyledAbout>
  );
};

export default About;
