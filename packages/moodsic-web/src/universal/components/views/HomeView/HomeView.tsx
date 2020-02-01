import React from 'react';
import styled from '@emotion/styled';
import { useHistory } from 'react-router';
import { XongkoroFetch } from 'xongkoro';

import homeData from './homeData.dummy';
import LeftBar from '@@universal/components/views/ViewBase/LeftBar';
import { log } from '@@universal/modules/Logger';
import News from './News';
import ViewBase from '@@universal/components/views/ViewBase/ViewBase';

const StyledTopBar = styled(ViewBase)({
  width: '100%',
});

const HomeView = () => {
  const fetchOptions = {
    cacheKey: 'http://localhost:5001',
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
    <StyledTopBar>
      <LeftBar
        handleClickEntry={handleClickEntry}
      />
      <XongkoroFetch
        fetchFunction={fetchFunction}
        fetchOptions={fetchOptions}
        renderData={News}
      />
    </StyledTopBar>
  );
};

export default HomeView;

function fetchFunction(param) {
  return async () => {
    log('fetchFunction(): executing with fetchParam: %j', param);

    // const { data } = await axios.post('http://localhost:5001/docs');
    return homeData;
  };
}
