import axios from 'axios';
import React from 'react';
import styled from '@emotion/styled';
import { useHistory } from 'react-router';
import { XongkoroFetch } from 'xongkoro';

import LeftBar from '@@universal/components/views/ViewBase/LeftBar';
import { log } from '@@universal/modules/Logger';
import MiniDoc from './MiniDoc';
import ViewBase from '@@universal/components/views/ViewBase/ViewBase';

const StyledDocsView = styled(ViewBase)({
  width: '100%',
});

const StyledTrendingDocCarousel = styled.div({
  '&>div': {
    height: 60,
  },
  display: 'flex',
  flexGrow: 1,
  justifyContent: 'center',
  marginRight: '250px',
  overflowX: 'scroll',
  overflowY: 'hidden',
  paddingTop: '55px',
});

const TrendingDocCarouselRendered = ({
  data,
  loading,
}) => {
  if (!loading) {
    log('TrendingDocCarouselRendered(): data: %o', data);
    const { payload } = data;
    const { documents = [] } = payload;
    const entries = React.useMemo(() => {
      return documents.map && documents.map((doc) => {
        const address = `${doc.namespace}/${doc.name}`;
        return (
          <MiniDoc
            address={address}
            doc={doc}
            key={address}
          />
        );
      });
    }, [documents]);

    return (
      <StyledTrendingDocCarousel>
        {entries}
      </StyledTrendingDocCarousel>
    );
  }

  return (
    <div>loading...</div>
  );
};


const DocsView = () => {
  const fetchOptions = {
    cacheKey: 'http://localhost:5001/docs',
    fetchParam: {
      power: 1,
    },
  };

  const history = useHistory();

  const handleClickEntry = React.useCallback((e) => {
    const { url } = e.target.dataset;
    history.push(url);
  }, []);

  return (
    <StyledDocsView>
      <LeftBar
        handleClickEntry={handleClickEntry}
      />
      <XongkoroFetch
        fetchFunction={fetchFunction}
        fetchOptions={fetchOptions}
        renderData={TrendingDocCarouselRendered}
      />
    </StyledDocsView>
  );
};

export default DocsView;

function fetchFunction(param) {
  return async () => {
    log('fetchFunction(): executing with fetchParam: %j', param);

    const { data } = await axios.post('http://localhost:5001/docs');
    return data;
  };
}
