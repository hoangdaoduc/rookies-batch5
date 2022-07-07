import React, { useContext, useEffect, useState } from 'react';
import UserContext from '../../shared/contexts/UserContext';
import LoginPage from '../LoginPage/LoginPage';
import axios from 'axios';

const ProfilePage = () => {
  const { token, userId } = useContext(UserContext);
  const [profile, setProfile] = useState({
    name: null,
    createdAt: null
  });
  
  useEffect(()=>{
    if(token && userId) {
      axios.get(`https://60dff0ba6b689e001788c858.mockapi.io/users/${userId}`, {
        Authorization: token
        })
        .then(response => {
          setProfile({
            name: response.data.name,
            createdAt: response.data.createdAt
          })
        })
    }
  })
  
  if(token === null) {
    return (<LoginPage/>)
  }
  return (
    <div>
      <div>{ profile.name }</div>
      <div>{ profile.createdAt }</div>
    </div>
  );
};

export default ProfilePage;
