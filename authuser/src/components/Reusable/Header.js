import React from "react";
import { Container, Nav, Navbar, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { signOutAction } from "../Actions/userAction";

const Header = () => {
 
  const userSignIn = useSelector((state) => state.userSignIn);
  const { userInfo } = userSignIn;
  const dispatch = useDispatch()
  

    const handleSignOut = () => {
      dispatch(signOutAction())
      window.location.reload()
    }
  return (
      <Navbar  bg="info" variant="dark" expand="lg">
          <Container>
        <Navbar.Brand href="#home">UserAuth</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <LinkContainer to="/">
                <Nav.Link>Home</Nav.Link>
            </LinkContainer>
            {
             !userInfo && (
                <>
              <LinkContainer to="/signin">
            <Nav.Link>Signin</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/registration">
            <Nav.Link>Registration</Nav.Link>
            </LinkContainer>
            </>
              )
            }
            
          </Nav>
          {
            userInfo && userInfo.email &&
             <Nav className="mr-auto">
               <LinkContainer to="/loggedin">
               <Button variant="warning mx-2">{userInfo.firstName}</Button>
               </LinkContainer>
               
                <Button onClick={handleSignOut}>Signout</Button>
          </Nav>
          }
          
        </Navbar.Collapse>
    </Container>
      </Navbar>
  );
};

export default Header;
