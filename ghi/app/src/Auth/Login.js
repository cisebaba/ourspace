import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

///

import styled from "styled-components";


/////
import React, { useContext } from "react";
import { Marginer } from "./marginer";
import { AccountContext } from "./accountContext";
import { motion } from "framer-motion";
import { Signup } from "./Signup";

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
  BoldLink,
  MutedLink,
  backdropVariants,
  expandingTransition
} from "./index";

 


function Login(props) {
  const [isExpanded, setExpanded] = useState(false)
  const [active, setActive] = useState("login");
  const { token, login } = props;
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  let navigate = useNavigate();

 const playExpandingAnimation = () => {
    setExpanded(true);
    setTimeout(() => {
      setExpanded(false);
    },  expandingTransition.duration * 1000 - 1500);
  };

  const switchToSignup = () => {
     playExpandingAnimation();
     setTimeout(() => {
      console.log("Time: 3 sec")
      //setActive("signup");
      navigate("../signup", {replace : true})
     }, 400);
  };

 const switchToLogin = () => {
    playExpandingAnimation();
    setTimeout(() => {
     //setActive("login");
      navigate("../login", {replace : true})
    }, 400);
  };

  const contextValue = { switchToSignup, switchToLogin }

  const handleSubmit = async e => {
    e.preventDefault();
    const error = await login(username, password);
    setError(error);
  };

  if (token) {
    return <Navigate to="/" />;
  }
  if (active === "login"){

  }
  return (
    <AccountContext.Provider value={contextValue}>
    <div className="container mt-5 py-5">
      <div className="App" >
        <CardWrapper>
          <TopContainer>
          <BackDrop 
          initial={false}
          animate={isExpanded? "expanded" : "collapsed"}
          variants={backdropVariants}
          transition={expandingTransition}
           
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
              <Marginer direction="vertical" margin={10} />
              <MutedLink>Don't have an account?{" "}
              <BoldLink onClick={switchToSignup}>Signup</BoldLink>
              </MutedLink>
              
              <p onClick={playExpandingAnimation}>Click</p>
          </InnerContainer>
          </CardWrapper>
          
      </div>
    </div>
    </AccountContext.Provider>
  );
}

export default Login;
