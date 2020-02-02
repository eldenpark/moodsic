import axios from 'axios';
import React from 'react';
import styled from '@emotion/styled';

const Form = styled.form({
});

const Row = styled.div({
  display: 'flex',
  marginBottom: 25,
});

const Submit = styled.input({
  alignItems: 'center',
  backgroundColor: '#FFA07A',
  borderRadius: "20px",
  boxShadow: "2px 8px 6px rgba(0,0,0,0.2),0px -5px 35px rgba(255,255,255,0.3)",
  color: 'white',
  cursor: 'pointer',
  display: 'flex',
  fontSize: 20,
  justifyContent: 'center',
  marginTop: 20,
  height: 40,
  width: 250,
});

const Input = styled.input({
  backgroundColor: '#F5F5F5',
  cursor: 'pointer',
  display: 'inline-block',
  boxShadow: "2px 8px 6px rgba(0,0,0,0.2),0px -5px 35px rgba(255,255,255,0.3)",
  borderRadius: "8px",
  height: 45,
  padding: 10,
  width: 250,
});

const Spectrogram = styled.div({
  backgroundColor: '#f7fafb',
  display: 'inline-block',
  marginLeft: 20,
  '& canvas': {
    width: 550,
    height: 120,
  },
});

const StyledLabel = styled.div({
  display: 'inline-block',
  borderRadius: '8px',
  height: 30,
  marginLeft: 20,
  width: 100,
  '& p': {
    color: '#565656',
  },
  '& p:first-child': {
    fontWeight: 600,
  },
});

const Label = ({
  id,
}) => {
  return (
    <StyledLabel>
      <p>Classification</p>
      <p id={id}>n/a</p>
    </StyledLabel>
  );
};

const Main = () => {
  const handleClickSubmit = React.useCallback(() => {
    const formData = new FormData();
    const files: any = document.getElementsByClassName('files');
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

    axios.post('http://localhost:4001/uploads', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(({ data }) => {
        console.log('Main(): classification API success, response: %o', data);

        if (data.payload && data.payload.length > 0) {
          data.payload.forEach((file) => {
            console.log('Main(): processing file: %s', file);
            if (fileMap[file.filename] !== undefined) {
              const label: any = document.getElementById(`label-${fileMap[file.filename]}`);
              if (label !== null) {
                const { score } = file.result[0].classification;
                const newLabel = `${file.result[0].displayName}-(${+score * 100}%)`;
                label.innerText = newLabel;
              }
            }
          });
        }
      })
      .catch((err) => {
        console.warn('Main(): classification API fails, error: %o', err);
      });
  }, []);

  return (
    <div>
      <Form id="myForm">
        <Row>
          <Input type="file" className="files"/><br />
          <Spectrogram>
            <canvas id="canvas-0"/>
          </Spectrogram>
          <Label id={`label-${0}`} />
        </Row>
        <Row>
          <Input type="file" className="files"/><br />
          <Spectrogram>
            <canvas id="canvas-1"/>
          </Spectrogram>
          <Label id={`label-${1}`} />
        </Row>
        <Row>
          <Input type="file" className="files"/><br />
          <Spectrogram>
            <canvas id="canvas-2"/>
          </Spectrogram>
          <Label id={`label-${2}`} />
        </Row>
        <Row>
          <Input type="file" className="files"/><br />
          <Spectrogram>
            <canvas id="canvas-3"/>
          </Spectrogram>
          <Label id={`label-${3}`} />
        </Row>
        <Submit
          onClick={handleClickSubmit}
          type="button"
          value="Run"
        />
      </Form>
    </div>
  );
};

export default Main;

function drawSpectrogram(file, canvasElement, idx) {
  console.log('drawSpectrogram(): idx: %s', idx);

  try {
    new (window.AudioContext || window['webkitAudioContext'])();
  } catch (err) {
    console.error('Audio API is not available');
    return;
  }

  const WIDTH = canvasElement.width;
  const audioContext = new (window.AudioContext || window['webkitAudioContext'])();
  const canvasContext = canvasElement.getContext('2d');

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

    if (x < WIDTH) {
      x += 1;
    } else {
      x = 0;
    }
  }
}
