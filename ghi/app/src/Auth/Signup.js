import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';


import { Marginer } from "./marginer";

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
  expandingTransition
} from "./index";





function Signup(props) {
  const [/*isExpanded*/, setExpanded] = useState(false)
  const { token, signup } = props;
  const [username, setUsername] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  // const [error, setError] = useState('');
  let navigate = useNavigate();

  // const handleSubmit = async e => {
  //   e.preventDefault();
  //   const error = await signup(username,firstname,lastname, email, password);
  //   setError(error);
  // };

  

  const playExpandingAnimation = () => {
     setExpanded(true);
     setTimeout(() => {
       setExpanded(false);
     },  expandingTransition.duration * 1000 - 1500);
   };
 
  //  const switchToSignup = () => {
  //     playExpandingAnimation();
  //     setTimeout(() => {
  //      console.log("Time: 3 sec")
  //      //setActive("signup");
  //      navigate("../signup", {replace : true})
  //     }, 400);
  //  };
 
  const switchToLogin = () => {
     playExpandingAnimation();
     setTimeout(() => {
      //setActive("login");
       navigate("../login", {replace : true})
     }, 400);
   };
 
  //  const contextValue = { switchToSignup, switchToLogin }

  if (token) {
    return <Navigate to="/profile/new" />;
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
        <SmallText>Sign Up</SmallText>
        </HeaderContainer>
      </TopContainer>
      <InnerContainer>
      <Input 
    
      required name="username" 
      type="text" onChange={e => setUsername(e.target.value)} 
      value={username} placeholder="username" />
          
      <Input 
      required name="firstname" 
      type="text" 
      onChange={e => setFirstname(e.target.value)} value={firstname} placeholder="firstname" />
          
      <Input required name="lastname" type="text" onChange={e => setLastname(e.target.value)} value={lastname} placeholder="lastname" />
      <Input required name="email" type="email" onChange={e => setEmail(e.target.value)} value={email} placeholder="email" />
      <Input required name="password" type="password" onChange={e => setPassword(e.target.value)} value={password} placeholder="password" />
          <Marginer direction="vertical" margin={20} />
          <CardButton
            onClick={() => signup(username, firstname, lastname, email, password)}
            type="submit"
          >Signup
          </CardButton>
          <Marginer direction="vertical" margin={10} />
          <MutedLink>Already Have an Account?{" "}
          <BoldLink onClick={switchToLogin}>Login</BoldLink>
          </MutedLink>
          
      </InnerContainer>
      </CardWrapper>
      
  </div>
</div>
);
}


export default Signup;
