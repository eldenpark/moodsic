import axios from 'axios';
import React from 'react';
import styled from '@emotion/styled';
import { useHistory, useParams } from 'react-router-dom';
import { XongkoroFetch } from 'xongkoro';

import Button from '@@universal/components/app/Buttons/Button';
import ButtonGroup from './ButtonGroup';
import DocInner from './DocInner';
import Editor from './Editor';
import { log } from '@@universal/modules/Logger';
import ViewBase from '@@universal/components/views/ViewBase/ViewBase';

const StyledDocView = styled(ViewBase)({
});

const DocContainer = styled.div({
  display: 'flex',
  flexGrow: 1,
  justifyContent: 'center',
});

const StyledContentArea = styled.div({
  display: 'flex',
  justifyContent: 'center',
  padding: '30px 0',
});

const Input = styled.input({
  border: '1px solid #d2d2d2',
  borderRadius: 3,
  marginBottom: 18,
  padding: 12,
  width: '100%',
});

const ContentAreaRendered = ({
  data,
  extraProps,
  loading,
}) => {
  if (!loading) {
    log('ContentAreaRendered(): data: %o', data);
    const { payload = {} } = data;
    const { registerEditor } = extraProps;

    return (
      <StyledContentArea>
        <Editor
          content={payload.content}
          registerEditor={registerEditor}
        />
      </StyledContentArea>
    );
  }

  return (
    <div>loading...</div>
  );
};

const DocEditView = () => {
  const history = useHistory();
  const editorRef = React.useRef<any>(null);
  const commitMsgInputRef = React.useRef<any>(null);
  const params = useParams();
  const { name, namespace } = params;
  const handleClickCancel = React.useCallback(() => {
    history.push(`/docs/blob/${namespace}/${name}`);
  }, []);
  const registerEditor = React.useCallback((instance) => {
    editorRef.current = instance;
  }, []);

  const docGetFetchOptions = {
    cacheKey: `http://localhost:5001/docs/blob/${namespace}/${name}`,
    fetchParam: {
      name,
      namespace,
    },
  };

  const handleClickProposeChange = React.useCallback(() => {
    if (editorRef.current !== null && commitMsgInputRef.current !== null) {
      const content = editorRef.current.value();
      const commitMsg = commitMsgInputRef.current.value;

      axios.post(`http://localhost:5001/docs/edit/${namespace}/${name}`, {
        commitMsg,
        content,
      })
        .then(() => {
          setTimeout(() => {
            history.push(`/doc/blob/${namespace}/${name}`);
          }, 3000);
        });
    }
  }, []);

  return (
    <StyledDocView>
      <DocContainer>
        <DocInner>
          <ButtonGroup alignRight>
            <Button
              onClick={handleClickCancel}
            >
              Cancel
            </Button>
          </ButtonGroup>
          <XongkoroFetch
            extraProps={{
              registerEditor,
            }}
            fetchFunction={fetchFunction}
            fetchOptions={docGetFetchOptions}
            renderData={ContentAreaRendered}
          />
          <div>
            <Input
              placeholder="Type commit message... (e.g. Add a category)"
              ref={commitMsgInputRef}
              type="text"
            />
          </div>
          <ButtonGroup>
            <Button onClick={handleClickProposeChange}>
              Propose Change
            </Button>
          </ButtonGroup>
        </DocInner>
      </DocContainer>
    </StyledDocView>
  );
};

export default DocEditView;

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
