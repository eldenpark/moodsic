import axios from 'axios';
import React from 'react';
import styled from '@emotion/styled';
import { useHistory, useParams } from 'react-router-dom';
import { XongkoroFetch } from 'xongkoro';

import Button from '@@universal/components/app/Buttons/Button';
import ButtonGroup from './ButtonGroup';
import DocInner from './DocInner';
import { log } from '@@universal/modules/Logger';
import ViewBase from '@@universal/components/views/ViewBase/ViewBase';
import Viewer from './Viewer';

const StyledDocView = styled(ViewBase)({
});

const DocContainer = styled.div({
  display: 'flex',
  flexGrow: 1,
  justifyContent: 'center',
});

const StyledEditHistory = styled.div({
  '&>div': {
    marginBottom: 7,
  },
  backgroundColor: '#efefef',
  borderRadius: 3,
  fontSize: '0.9em',
  marginBottom: 15,
  padding: 12,
});

const ContentArea = styled.div({
  display: 'flex',
  justifyContent: 'center',
});

const EditHistory = ({
  commitLogs,
}) => {
  const entries = React.useMemo(() => {
    return commitLogs && commitLogs.map((commitLog) => {
      return (
        <div key={commitLog}>
          {commitLog}
        </div>
      );
    });
  }, [commitLogs]);

  return (
    <StyledEditHistory>{entries}</StyledEditHistory>
  );
};

const DocRendered = ({
  data,
  extraProps,
  loading,
}) => {
  if (!loading) {
    log('ContentAreaRendered(): data: %o', data);
    const { payload = {} } = data;
    const { handleClickEdit } = extraProps;

    return (
      <DocInner>
        <EditHistory commitLogs={payload.commitLogs} />
        <ButtonGroup alignRight>
          <Button
            onClick={handleClickEdit}
          >
            Edit
          </Button>
        </ButtonGroup>
        <ContentArea>
          <Viewer content={payload.content} />
        </ContentArea>
      </DocInner>
    );
  }

  return (
    <div>loading...</div>
  );
};

const DocView = () => {
  const history = useHistory();
  const params = useParams();
  const { name, namespace } = params;
  const handleClickEdit = React.useCallback(() => {
    history.push(`/docs/edit/${namespace}/${name}`);
  }, [params]);

  const fetchOptions = {
    cacheKey: `http://localhost:5001/docs/blob/${params.namespace}/${params.name}`,
    fetchParam: {
      name,
      namespace,
    },
  };

  return (
    <StyledDocView>
      <DocContainer>
        <XongkoroFetch
          extraProps={{
            handleClickEdit,
          }}
          fetchFunction={fetchFunction}
          fetchOptions={fetchOptions}
          renderData={DocRendered}
        />
      </DocContainer>
    </StyledDocView>
  );
};

export default DocView;

function fetchFunction({
  name,
  namespace,
}) {
  return async () => {
    log('fetchFunction(): executing with name: %s, namesapce: %s', name, namespace);

    const { data } = await axios.post(`http://localhost:5001/docs/blob/${namespace}/${name}`);
    return data;
  };
}
