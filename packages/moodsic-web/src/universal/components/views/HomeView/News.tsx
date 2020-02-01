import React from 'react';
import styled from '@emotion/styled';

const StyledNews = styled.div({
  display: 'flex',
  flexDirection: 'column',
  paddingTop: 55,
});

const Avatar = styled.img({
  height: 80,
  width: 80,
});

const Body = styled.div({
  paddingLeft: 12,
  width: '600px',
});

const StyledNewsEntry = styled.div({
  alignItems: 'center',
  display: 'flex',
  marginBottom: '18px',
});

const Username = styled.span({
  fontWeight: 600,
  marginRight: 5,
});

const TargetDoc = styled.span({
  fontWeight: 600,
  marginLeft: 5,
});

const Time = styled.div({
  color: 'gray',
  fontSize: '0.9em',
  marginTop: 6,
});

const Title = styled.div({});

const Change = styled.div({
  marginTop: 6,
});

const Diff = styled.div({
  '& .addition': {
    background: '#8fef8fb8',
  },
  '& .removal': {
    backgroundColor: '#ef7d7deb',
  },
  '&>span': {
    whiteSpace: 'pre',
  },
  border: '1px solid gray',
  borderRadius: 3,
  fontFamily: `'Ubuntu Mono', monospace`,
  marginTop: 4,
  padding: 3,
});

const NewsEntry = ({
  newsEntry,
}) => {
  const { diff } = newsEntry;
  const diffMap: any = [];
  let chunk: any = [];
  let chunkType = 'plain';
  let chunkIdx = 0;
  for (let idx = 0; idx < diff.length; idx += 1) {
    const c = diff[idx];
    if (c === '[') {
      diffMap.push({
        chunk,
        chunkIdx: chunkIdx += 1,
        chunkType,
      });
      chunk = [];
      chunkType = 'removal';
    } else if (c === ']') {
      diffMap.push({
        chunk,
        chunkIdx: chunkIdx += 1,
        chunkType,
      });
      chunkType = 'plain';
      chunk = [];
    } else if (c === '{') {
      diffMap.push({
        chunk,
        chunkIdx: chunkIdx += 1,
        chunkType,
      });
      chunk = [];
      chunkType = 'addition';
    } else if (c === '}') {
      diffMap.push({
        chunk,
        chunkIdx: chunkIdx += 1,
        chunkType,
      });
      chunk = [];
      chunkType = 'plain';
    } else if (
      !(chunkType === 'removal' && c === '-')
      && !(chunkType === 'addition' && c === '+')
    ) {
      chunk.push(c);
    }
    if (idx === diff.length - 1) {
      diffMap.push({
        chunk,
        chunkIdx: chunkIdx += 1,
        chunkType,
      });
    }
  }

  const _diff = diffMap.map((df) => {
    return (
      <span
        className={df.chunkType}
        key={df.chunkIdx}
      >
        {df.chunk.join('')}
      </span>
    );
  });

  const date = new Date(newsEntry.timestamp);
  const _date = `${date.getFullYear()}/${date.getMonth()}/${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;

  return (
    <StyledNewsEntry>
      <Avatar src={newsEntry.avatarUrl} />
      <Body>
        <Title>
          <Username>{newsEntry.username}</Username>
          <span>proposed to</span>
          <TargetDoc>{`${newsEntry.targetDocNamespace}/${newsEntry.targetDocName}`}</TargetDoc>
        </Title>
        <Change>
          <div>{newsEntry.commitMsg}</div>
          <Diff>
            {_diff}
          </Diff>
        </Change>
        <Time>
          {_date}
        </Time>
      </Body>
    </StyledNewsEntry>
  );
};

const News = ({
  data,
  loading,
}) => {
  if (!loading) {
    const result = data.map((d) => {
      return (
        <NewsEntry
          key={d.username}
          newsEntry={d}
        />
      );
    });
    return (
      <StyledNews>
        {result}
      </StyledNews>
    );
  }

  return (
    <span>loading</span>
  );
};

export default React.memo(News);
