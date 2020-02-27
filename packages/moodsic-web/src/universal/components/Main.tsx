import axios from 'axios';
import React from 'react';
import styled from '@emotion/styled';

import Control from '@@src/universal/components/Control';

const Form = styled.form({
});

const Row = styled.div({
  display: 'flex',
  marginBottom: 25,
});

const StyledInput = styled.div({
  borderRadius: 7,
  display: 'flex',
  flexDirection: 'column',
  fontSize: 12,
  width: 230,
  '& input': {
    borderBottom: '1px solid #bfbfbf',
    cursor: 'pointer',
    paddingBottom: 2,
  },
  '& input:hover': {
    fontWeight: 600,
  },
});

const Input = () => {
  return (
    <StyledInput>
      <input
        className="files"
        type="file"
      />
    </StyledInput>
  );
};

const Spectrogram = styled.div({
  backgroundColor: '#f7fafb',
  display: 'inline-block',
  marginLeft: 20,
  '& canvas': {
    width: 350,
    height: 85,
  },
});

const StyledLabel = styled.div({
  marginLeft: 20,
  width: 100,
  '& p': {
    color: '#565656',
  },
  '& p:first-child': {
    borderBottom: '1px solid #bfbfbf',
    fontSize: 12,
    fontWeight: 600,
    padding: '2 0 2',
  },
  '& .focus': {
    color: 'white',
    fontWeight: 600,
    backgroundColor: '#0a0c0c',
  },
  '& > p:last-child': {
    paddingTop: 10,
  },
});

const Label = ({
  id,
}) => {
  return (
    <StyledLabel className="label">
      <p>Classification</p>
      <p id={id}>-</p>
    </StyledLabel>
  );
};

const Main = () => {
  React.useEffect(() => {
    console.log('Main(): useEffect(): main is rendered');
    const form: any = document.getElementById('form');
    form.sources = [];
    form.labels = [];
  }, []);

  const [startStop, setStartStop] = React.useState<any>('Start');

  const handleClickSubmit = React.useCallback(createHandleClickSubmit(
    startStop,
    setStartStop,
  ), [startStop]);

  return (
    <div>
      <Form id="form">
        {/* <img src="/public/assets/1.wav.png" alt=""/> */}
        <Row>
          <Input />
          <Spectrogram>
            <canvas id="canvas-0"/>
          </Spectrogram>
          <Label id={`label-${0}`} />
        </Row>
        <Row>
          <Input />
          <Spectrogram>
            <canvas id="canvas-1"/>
          </Spectrogram>
          <Label id={`label-${1}`} />
        </Row>
        <Row>
          <Input />
          <Spectrogram>
            <canvas id="canvas-2"/>
          </Spectrogram>
          <Label id={`label-${2}`} />
        </Row>
        <Control
          handleClickSubmit={handleClickSubmit}
          startStop={startStop}
        >
        </Control>
      </Form>
    </div>
  );
};

export default Main;

function createHandleClickSubmit(startStop, setStartStop) {
  return () => {
    const files: any = document.getElementsByClassName('files');
    const form: any = document.getElementById('form');

    if (startStop === 'Start') {
      setStartStop('Stop');

      const formData = new FormData();
      const fileMap = {};

      for (let i = 0; i < files.length; i += 1) {
        const file = files[i].files[0];
        if (file !== undefined) {
          console.log('Main(): including file: %o', file);

          formData.append('files', file);
          fileMap[file.name] = i;
          const canvas: any = document.getElementById(`canvas-${i}`);
          drawSpectrogram(file, canvas, i);
        }
      }

      if (Object.keys(fileMap).length > 0) {
        axios.post('http://localhost:4001/uploads', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
          .then(({ data }) => {
            console.log('Main(): classification API success, response: %o', data);

            if (data.payload && data.payload.length > 0) {
              data.payload.forEach((file) => {
                console.log('Main(): processing file: %o', file);

                if (fileMap[file.filename] !== undefined) {
                  const label: any = document.getElementById(`label-${fileMap[file.filename]}`);
                  if (label !== null) {
                    const { classification, displayName } = file.result[0];
                    const normalizedScore = (+classification.score * 100) / 100;
                    form.labels.push(displayName);
                    const newLabel = `<b>${displayName}</b> (${normalizedScore.toFixed(5)}%)`;
                    label.innerHTML = newLabel;
                  }
                }
              });
            }
          })
          .catch((err) => {
            console.warn('Main(): classification API fails, error: %o', err);
          });
      }
    } else {
      setStartStop('Start');

      for (let i = 0; i < files.length; i += 1) {
        const file = files[i].files[0];
        if (file !== undefined) {
          console.log('Main(): including file: %o', file);

          const canvas = document.getElementById(`canvas-${i}`) as HTMLCanvasElement;
          const context = canvas.getContext('2d')!;
          context.clearRect(0, 0, canvas.width, canvas.height);

          form.sources[i].stop();
        }
      }
    }
  };
}

function drawSpectrogram(file, canvasElement, idx) {
  console.log('drawSpectrogram(): idx: %s', idx);

  try {
    new (window.AudioContext || window['webkitAudioContext'])();
  } catch (err) {
    console.error('Audio API is not available');
    return;
  }

  const canvasWidth = canvasElement.width;
  const audioContext = new (window.AudioContext || window['webkitAudioContext'])();
  const canvasContext = canvasElement.getContext('2d');
  const form: any = document.getElementById('form');

  let source;
  let eightBufferLength;
  let dataArray;
  let imageDataFrame;
  let x = 0;
  let analyser = audioContext.createAnalyser();
  analyser.smoothingTimeConstant = 0.0;
  analyser.fftSize = 256;

  const bufferLength = analyser.frequencyBinCount;
  eightBufferLength = 8 * bufferLength + 1;
  dataArray = new Uint8Array(bufferLength);

  navigator.getUserMedia = navigator.getUserMedia
    || navigator['webkitGetUserMedia']
    || navigator['mozGetUserMedia']
    || navigator['msGetUserMedia'];

  imageDataFrame = canvasContext.createImageData(2, canvasElement.height);

  for (var index = 0; index < imageDataFrame.data.length * 4; index += 8) {
    imageDataFrame.data[index] = imageDataFrame.data[index + 6] = 0;

    imageDataFrame.data[index + 3] =
      imageDataFrame.data[index + 4] =
      imageDataFrame.data[index + 5] =
      imageDataFrame.data[index + 7] = 255;
  }

  source = audioContext.createBufferSource();
  form.sources.push(source);

  const reader = new FileReader();
  reader.onload = function (ev: any) {
    audioContext.decodeAudioData(
      ev.target.result,
      function (_buffer) {
        source.buffer = _buffer;
        source.connect(analyser);
        source.connect(audioContext.destination);
        source.start(0);
        draw();
      },
      (err) => {
        console.log('drawSpectrogram(): erorr', err);
      },
    );
  };

  reader.readAsArrayBuffer(file);

  function draw() {
    requestAnimationFrame(draw);
    analyser.getByteFrequencyData(dataArray);

    for (var index = 0, _o = eightBufferLength; index < bufferLength; ++index, _o -= 8) {
      imageDataFrame.data[_o] =
        imageDataFrame.data[_o + 1] = dataArray[index] * 2;
    }

    canvasContext.putImageData(imageDataFrame, x, 0);

    if (x < canvasWidth) {
      x += 1;
    } else {
      x = 0;
    }
  }
}
