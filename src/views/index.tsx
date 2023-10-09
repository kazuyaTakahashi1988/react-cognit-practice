import React from 'react'
import '../App.css'
import { useNavigate } from 'react-router-dom';


const Home: React.FC = () => {

  const navigate = useNavigate();
  const routerPushSignOut = () => navigate('/auth/signout', { replace: true });

  return (
    <div className="home">
      <h1>Homeページだよ！</h1>
      <button onClick={routerPushSignOut}>サインアウトする？</button>
    </div>
  )
}

export default Home
