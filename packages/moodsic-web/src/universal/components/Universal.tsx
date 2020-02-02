import { compose } from 'redux';
import { css, Global } from '@emotion/core';
import { hot } from 'react-hot-loader/root';
import React from 'react';
import styled from '@emotion/styled';

import ErrorBoundary from '@@src/universal/components/app/Error/ErrorBoundary';
import normalize from '@@src/universal/styles/normalize';

const normalizeStyle = css`
  ${normalize}
`;

const customStyle = css({
  '*': {
    boxSizing: 'border-box',
    color: 'black',
  },
  a: {
    textDecoration: 'none',
  },
  body: {
  },
  input: {
    border: 'none',
    outline: 'none',
  },
  p: {
    margin: 0,
  },
});

const StyledUniversal = styled.div({
  fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif;',
});

const Hyunjae = styled.form({
  marginTop: '30px',
  width: '800px'
  
});


const Inpsubmit = styled.input({
  color: 'white',
  backgroundColor: '#FFA07A',
  width: '300px',
  height: '40px',
  boxShadow: "2px 8px 6px rgba(0,0,0,0.2),0px -5px 35px rgba(255,255,255,0.3)",
  padding:"5px 10px 5px 10px",
  fontSize: '20px',
  borderRadius: "20px",
  marginTop: '80px',
  marginLeft: '80px'

});

const Inp = styled.input({
  display: 'inline-block',
  boxShadow: "2px 8px 6px rgba(0,0,0,0.2),0px -5px 35px rgba(255,255,255,0.3)",
  borderRadius: "8px",
  width: '300px',
  height: '50px',
  marginTop: '80px',
  marginLeft: '80px',
  backgroundColor: '#F5F5F5',
  paddingLeft: '15px',
  paddingTop: '13px'

});

const SigBox1 = styled.div({
  display: 'inline-block',
  boxShadow: "1px 3px 4px rgba(0,0,0,0.2),0px -5px 35px rgba(255,255,255,0.3)",
  borderRadius: '8px',
  width: '300px',
  height: '100px',
  marginTop: '-735px',
  marginLeft: '500px',
  backgroundColor: 'white',
  
});
const SigBox2 = styled.div({
  display: 'inline-block',
  boxShadow: "1px 3px 4px rgba(0,0,0,0.2),0px -5px 35px rgba(255,255,255,0.3)",
  borderRadius: '8px',
  width: '300px',
  height: '100px',
  marginTop: '-600px',
  marginLeft: '500px',
  backgroundColor: 'white',
  
});

const SigBox3 = styled.div({
  display: 'inline-block',
  boxShadow: "1px 3px 4px rgba(0,0,0,0.2),0px -5px 35px rgba(255,255,255,0.3)",
  borderRadius: '8px',
  width: '300px',
  height: '100px',
  marginTop: '-470px',
  marginLeft: '500px',
  backgroundColor: 'white',
  
});
const SigBox4 = styled.div({
  display: 'inline-block',
  boxShadow: "1px 3px 4px rgba(0,0,0,0.2),0px -5px 35px rgba(255,255,255,0.3)",
  borderRadius: '8px',
  width: '300px',
  height: '100px',
  marginTop: '-340px',
  marginLeft: '500px',
  backgroundColor: 'white',
  
});
const SigBox5 = styled.div({
  display: 'inline-block',
  boxShadow: "1px 3px 4px rgba(0,0,0,0.2),0px -5px 35px rgba(255,255,255,0.3)",
  borderRadius: '8px',
  width: '300px',
  height: '100px',
  marginTop: '-210px',
  marginLeft: '500px',
  backgroundColor: 'white',
  
});
const Label1 = styled.div({
  display: 'inline-block',
  boxShadow: "1px 3px 4px rgba(0,0,0,0.2),0px -5px 35px rgba(255,255,255,0.3)",
  borderRadius: '8px',
  width: '100px',
  height: '30px',
  marginTop: '-735px',
  marginLeft: '850px',
  backgroundColor: 'white',
  
});
const Label2 = styled.div({
  display: 'inline-block',
  boxShadow: "1px 3px 4px rgba(0,0,0,0.2),0px -5px 35px rgba(255,255,255,0.3)",
  borderRadius: '8px',
  width: '100px',
  height: '30px',
  marginTop: '-600px',
  marginLeft: '850px',
  backgroundColor: 'white',
  
});
const Label3 = styled.div({
  display: 'inline-block',
  boxShadow: "1px 3px 4px rgba(0,0,0,0.2),0px -5px 35px rgba(255,255,255,0.3)",
  borderRadius: '8px',
  width: '100px',
  height: '30px',
  marginTop: '-470px',
  marginLeft: '850px',
  backgroundColor: 'white',
  
});
const Label4 = styled.div({
  display: 'inline-block',
  boxShadow: "1px 3px 4px rgba(0,0,0,0.2),0px -5px 35px rgba(255,255,255,0.3)",
  borderRadius: '8px',
  width: '100px',
  height: '30px',
  marginTop: '-340px',
  marginLeft: '850px',
  backgroundColor: 'white',
  
});
const Label5 = styled.div({
  display: 'inline-block',
  boxShadow: "1px 3px 4px rgba(0,0,0,0.2),0px -5px 35px rgba(255,255,255,0.3)",
  borderRadius: '8px',
  width: '100px',
  height: '30px',
  marginTop: '-210px',
  marginLeft: '850px',
  backgroundColor: 'white',
  
});

const Vertline = styled.div({
  position: 'fixed',
  borderLeft: "3px dotted #D3D3D3",
  borderWidth: 'thick',
  height: '770px',
  marginLeft: '1020px',
  top: '50px'
});
const HorLine1 = styled.div({
  position: 'absolute',
  borderTop: "1px dotted #D3D3D3",
  borderWidth: 'thick',
  width: '70px',
  marginTop: '80px',
  marginLeft: '405px',
  top: '55px',
});
const HorLine2 = styled.div({
  borderTop: "1px dotted #D3D3D3",
  borderWidth: 'thick',
  width: '70px',
  position: 'absolute',
  marginLeft: '405px',
  top: '265px'
});
const HorLine3 = styled.div({
  borderTop: "1px dotted #D3D3D3",
  borderWidth: 'thick',
  width: '70px',
  position: 'absolute',
  marginLeft: '405px',
  top: '395px'
});
const HorLine4 = styled.div({
  borderTop: "1px dotted #D3D3D3",
  borderWidth: 'thick',
  width: '70px',
  position: 'absolute',
  marginLeft: '405px',
  top: '525px'
});
const HorLine5 = styled.div({
  borderTop: "1px dotted #D3D3D3",
  borderWidth: 'thick',
  width: '70px',
  position: 'absolute',
  marginLeft: '405px',
  top: '655px'
});
const Happy = styled.div({
  display: 'inline-block',
  boxShadow: "1px 3px 4px rgba(0,0,0,0.2),0px -5px 35px rgba(255,255,255,0.3)",
  borderRadius: '8px',
  width: '150px',
  height: '50px',
  marginTop: '-735px',
  marginLeft: '1100px',
  backgroundColor: 'white',
  
});

const Sad = styled.div({
  display: 'inline-block',
  boxShadow: "1px 3px 4px rgba(0,0,0,0.2),0px -5px 35px rgba(255,255,255,0.3)",
  borderRadius: '8px',
  width: '150px',
  height: '50px',
  marginTop: '-650px',
  marginLeft: '1100px',
  backgroundColor: 'white',
  
});

const Calm = styled.div({
  display: 'inline-block',
  boxShadow: "1px 3px 4px rgba(0,0,0,0.2),0px -5px 35px rgba(255,255,255,0.3)",
  borderRadius: '8px',
  width: '150px',
  height: '50px',
  marginTop: '-565px',
  marginLeft: '1100px',
  backgroundColor: 'white',
  
});



const Universal: React.FC<any> = () => {
 
  return (
    <StyledUniversal>
      <ErrorBoundary>
        <Hyunjae id="myForm" method="post" encType="multipart/form-data">
          <Inp type="file" id="files"/><br />
          <Inp type="file" id="files" name="files" /><br />
          <Inp type="file" id="files" name="files" /><br />
          <Inp type="file" id="files" name="files" /><br />
          <Inp type="file" id="files" name="files" /><br />
          <div id="selectedFiles" />
          <Inpsubmit type="submit" value="Run"/>
        </Hyunjae>
        <div>
          <SigBox1>
  
          </SigBox1>
          
          
        </div>
        <HorLine1></HorLine1>
        <div>
          <Label1>
        
          </Label1>
        </div>
        <div>
          <SigBox2>
          </SigBox2>
        </div>
        <HorLine2></HorLine2>
        <div>
          <Label2>
        
          </Label2>
        </div>
        <div>
          <SigBox3>
          
          </SigBox3>
        </div>
        <HorLine3></HorLine3>
        <div>
          <Label3>
        
          </Label3>
        </div>
        <div>
          <SigBox4>
        
          </SigBox4>
        </div>
        <HorLine4></HorLine4>
        <div>
          <Label4>
        
          </Label4>
        </div>
        <div>
          <SigBox5>
        
          </SigBox5>
        </div>
        <HorLine5></HorLine5>
        <div>
          <Label5>
        
          </Label5>
        </div>
        <Vertline></Vertline>
        <div>
          <Happy>

          </Happy>
        </div>
        <div>
          <Sad>

          </Sad>
        </div>
        <div>
          <Calm>

          </Calm>
        </div>

        <script></script>
        <Global
          styles={normalizeStyle}
        />
        <Global
          styles={customStyle}
        />

      </ErrorBoundary>
    </StyledUniversal>
  );
};

export default compose(
  hot,
)(Universal);

declare global {
  interface Window {
    SimpleMDE;
  }
}
