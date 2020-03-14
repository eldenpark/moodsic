import React from 'react';
import styled from '@emotion/styled';

const isProd = process.env.NODE_ENV === 'production';

const StyledRow = styled.div({
  display: 'flex',
  marginBottom: 16,
});

const StyledInput = styled.div({
  borderRadius: 7,
  display: 'flex',
  flexDirection: 'column',
  fontSize: 13,
  width: 200,
  '& input': {
    borderBottom: '1px solid #bfbfbf',
    cursor: 'pointer',
    paddingBottom: 2,
  },
  '& input:hover': {
    fontWeight: 600,
  },
  '& .filename-production': {
    paddingTop: 4,
  },
});

const Input = ({
  fileName,
  fileUrl,
  itemId,
}) => {
  return (
    <StyledInput>
      <input
        className="files"
        disabled={isProd ? true : false}
        type="file"
      />
      <p
        className="hide"
        id={`fileUrl-production-${itemId}`}>
          {fileUrl}
      </p>
      <p
        className={isProd ? 'fileName-production' : 'hide'}
        id={`fileName-production-${itemId}`}
      >
        {isProd && fileName}
      </p>
    </StyledInput>
  );
};

const Spectrogram = styled.div({
  display: 'inline-block',
  marginLeft: 20,
  width: 280,
  '& div:first-child': {
    backgroundColor: '#2b2b2b',
  },
  '& canvas': {
    width: 280,
    height: 85,
  },
  '& img': {
    height: 50,
    marginTop: 6,
    width: '100%',
  },
});

const Image = ({
  imgSrc,
}) => {
  return !!isProd && (
    <img
      alt="Spectrogram image pre-generated"
      src={imgSrc}
    />
  );
};

const StyledClassification = styled.div({
  marginLeft: 20,
  width: 100,
  '& p': {
    color: '#565656',
  },
  '& p:first-child': {
    borderBottom: '1px solid #bfbfbf',
    fontSize: 14,
    fontWeight: 600,
    padding: '2 0 2',
    marginBottom: 4,
  },
  '& .focus, & .focus *': {
    color: 'white',
    fontWeight: 600,
    backgroundColor: '#0a0c0c',
  },
  '& > p:last-child': {
    paddingTop: 10,
  },
});

const Classification = ({
  itemId,
}) => {
  return (
    <StyledClassification>
      <p>Classification</p>
      <p id={`classification-${itemId}`}>
        No Data
      </p>
    </StyledClassification>
  );
};

const Row = ({
  itemId,
  pregeneratedData = {},
}) => {
  const {
    fileName,
    fileUrl,
    imgSrc,
  } = pregeneratedData as any;

  return (
    <StyledRow>
      <Input
        fileName={fileName}
        fileUrl={fileUrl}
        itemId={itemId}
      />
      <Spectrogram>
        <div>
          <canvas id={`canvas-${itemId}`} />
        </div>
        <Image
          imgSrc={imgSrc}
        />
      </Spectrogram>
      <Classification
        itemId={itemId}
      />
    </StyledRow>
  );
};

export default Row;
