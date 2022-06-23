import { useState } from 'react';
import { Navigate } from 'react-router-dom';

///

import styled from "styled-components";


/////
import React, { useContext } from "react";
import { Marginer } from "./marginer";
//import { AccountContext } from "./accountContext";
import { motion } from "framer-motion";

/////
import {
  CardWrapper,
  TopContainer,
  HeaderContainer,
  BackDrop,
  HeaderText,
  SmallText,
  Input,
  CardButton,
  InnerContainer,
} from "./index";




function Login(props) {
  const { token, login } = props;
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    const error = await login(username, password);
    setError(error);
  };

  if (token) {
    return <Navigate to="/" />;
  }

  return (
    <div className="container mt-5 py-5">
      <div className="App">
        <CardWrapper>
          <TopContainer>
          <BackDrop 
           
          />
            <HeaderContainer>
            <HeaderText>Welcome!</HeaderText>
            <SmallText>Please Sign in</SmallText>
            </HeaderContainer>
          </TopContainer>
          <InnerContainer>
          <Input
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                placeholder="Username"
                type="text"
                required
              />
              <Input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                placeholder="Password"
                type="password"
                required
              />
              <Marginer direction="vertical" margin={20} />
              <CardButton
                onClick={() => login(username, password)}
                type="button"
              >
                Sign In
              </CardButton>
              
          </InnerContainer>
          </CardWrapper>
          
      </div>
    </div>
  );
}

export default Login;
