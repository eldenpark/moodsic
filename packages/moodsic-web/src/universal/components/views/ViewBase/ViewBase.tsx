import {
  Link,
} from 'react-router-dom';
import React from 'react';
import styled from '@emotion/styled';

import Search from '@@src/universal/components/views/DocsView/Search';

const StyledViewBase = styled.div({
  minHeight: '100%',
});

const StyledTop = styled.div({
  alignItems: 'center',
  borderBottom: '1px solid #b1b1b1',
  display: 'flex',
  height: 58,
  justifyContent: 'space-between',
  padding: '0 30',
});

const SearchBar = styled.div({
  alignItems: 'center',
  justifyContent: 'center',
  overflow: ' idden',
});

const Top = ({
  children,
}) => {
  return (
    <StyledTop>
      {children}
    </StyledTop>
  );
};

const Logo = styled.div({
  '& svg': {
    marginRight: 12,
  },
  alignItems: 'center',
  display: 'flex',
  fontSize: 24,
});

const Account = styled.div({
  '& p': {
    cursor: 'pointer',
  },
  '&>p:not(:last-child)': {
    marginRight: 15,
  },
  display: 'flex',
});

const Bottom = styled.div({
  display: 'flex',
  minHeight: 'calc(100% - 58px)',
});

const ViewBase: React.FC<any> = ({
  children,
  className,
}) => {
  return (
    <StyledViewBase className={className}>
      <Top>
        <Logo>
          <Link to="/">
            FORM
          </Link>
        </Logo>
        <SearchBar>
          <Search />
        </SearchBar>
        <Account>
          <p>
            <Link to="/docs/post">
              Post
            </Link>
          </p>
          <p>Elden</p>
        </Account>
      </Top>
      <Bottom>
        {children}
      </Bottom>
    </StyledViewBase>
  );
};

export default ViewBase;

interface PageBaseProps {
  className?: string;
}
