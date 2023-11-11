import React from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom';


const Home: React.FC = () => {

  const navigate = useNavigate();
  const routerPushSignOut = () => navigate('/auth/signout', { replace: true });

  return (
    <Styled>
      <h1>Homeページだよ！</h1>
      <button onClick={routerPushSignOut}>サインアウトする？</button>
    </Styled>
  )
}

const Styled = styled.div`
  
`;

export default Home
