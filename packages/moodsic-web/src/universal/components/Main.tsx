import axios from 'axios';
import React from 'react';
import styled from '@emotion/styled';

import Control from '@@src/universal/components/Control';
import {
  FileMap,
  FormType,
} from '@@src/universal/components/types';
import pregeneratedData from '@@src/universal/pregeneratedData';
import Row from '@@src/universal/components/Row';

const Form = styled.form({
});

const Main = () => {
  React.useEffect(() => {
    console.log('Main(): useEffect(): main is rendered');
    const form = document.getElementById('form') as FormType;
    form.sources = [];
    form.labels = [];
  }, []);

  const startStopState = React.useRef<any>('Start');
  const [, updateState] = React.useState();
  const setStartStopState = React.useCallback((nextState) => {
    startStopState.current = nextState;
    updateState({});
  }, []);

  const handleClickSubmit = React.useCallback(createHandleClickSubmit(
    startStopState,
    setStartStopState,
  ), [startStopState]);

  return (
    <div>
      <Form id="form">
        <Row
          itemId="0"
          pregeneratedData={pregeneratedData[0]}
        />
        <Row
          itemId="1"
          pregeneratedData={pregeneratedData[1]}
        />
        <Row
          itemId="2"
          pregeneratedData={pregeneratedData[2]}
        />
        <Control
          handleClickSubmit={handleClickSubmit}
          startStopState={startStopState}
        >
        </Control>
      </Form>
    </div>
  );
};

export default Main;

function createHandleClickSubmit(
  startStopState: { current: string },
  setStartStopState,
) {
  const isProd = process.env.NODE_ENV === 'production';

  return () => {
    const files: any = document.getElementsByClassName('files');
    const form = document.getElementById('form') as FormType;

    console.log('createHandleclickSubmit(): startStop: %s', startStopState.current);

    if (startStopState.current === 'Start') {
      setStartStopState('Stop');

      const formData = new FormData();
      const fileMap: FileMap = {};

      for (let i = 0; i < files.length; i += 1) {
        const file = files[i].files[0];
        const canvas: any = document.getElementById(`canvas-${i}`);
        if (file !== undefined) {
          console.log('createHandleclickSubmit(): start, file: %o', file);

          formData.append('files', file);
          fileMap[file.name] = i;
          drawSpectrogram(file, canvas, i, startStopState);
        }

        if (isProd) {
          const fileUrl = document.getElementById(`fileUrl-production-${i}`);

          if (fileUrl !== null) {
            axios.get(fileUrl.innerText, {
              responseType: 'blob',
            })
              .then((response) => {
                const { data } = response;
                const _pregeneratedData = pregeneratedData[i];

                console.log('createHandleclickSubmit(): NODE_ENV: production, including data: %o', data);

                const label: any = document.getElementById(`classification-${i}`);
                if (label !== null) {
                  const { classification, displayName } = _pregeneratedData.classify;
                  const normalizedScore = (+classification.score * 100) / 100;
                  form.labels.push(displayName);
                  const newLabel = `<b>${displayName}</b> (${normalizedScore.toFixed(5)}%)`;
                  label.innerHTML = newLabel;
                }

                drawSpectrogram(data, canvas, i, startStopState);
              });
          }
        }
      }

      if (Object.keys(fileMap).length > 0 && !isProd) {
        axios.post('http://localhost:4001/uploads', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
          .then(({ data }) => {
            console.log('createHandleclickSubmit(): classification API success, response: %o', data);

            if (data.payload && data.payload.length > 0) {
              data.payload.forEach((file) => {
                console.log('createHandleclickSubmit(): processing file: %o', file);

                if (fileMap[file.filename] !== undefined) {
                  const label: any = document.getElementById(`classification-${fileMap[file.filename]}`);
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
            console.warn('createHandleclickSubmit(): classification API fails, error: %o', err);
          });
      }
    } else {
      setStartStopState('Start');

      for (let i = 0; i < files.length; i += 1) {
        const file = files[i].files[0];
        console.log('createHandleclickSubmit(): stop, i: %s, file: %o, sources: %o', i, file, form.sources);

        if (form.sources[i] !== undefined) {
          console.log('createHandleclickSubmit(): stop source, i:%s', i);
          form.sources[i].stop();
        }

        setTimeout(() => {
          const canvas = document.getElementById(`canvas-${i}`) as HTMLCanvasElement;
          const context = canvas.getContext('2d')!;
          context.clearRect(0, 0, canvas.width, canvas.height);
        }, 200);
      }

      form.sources = [];
    }
  };
}

function drawSpectrogram(
  file: Blob,
  canvasElement: HTMLCanvasElement,
  idx: number,
  startStopState,
) {
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

  imageDataFrame = canvasContext!.createImageData(2, canvasElement.height);

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
    if (startStopState.current === 'Stop') {
      requestAnimationFrame(draw);
    }
    analyser.getByteFrequencyData(dataArray);

    for (var index = 0, _o = eightBufferLength; index < bufferLength; ++index, _o -= 8) {
      imageDataFrame.data[_o] =
        imageDataFrame.data[_o + 1] = dataArray[index] * 2;
    }

    canvasContext!.putImageData(imageDataFrame, x, 0);

    if (x < canvasWidth) {
      x += 1;
    } else {
      x = 0;
    }
  }
}
