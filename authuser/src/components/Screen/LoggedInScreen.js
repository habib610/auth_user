import React, { useEffect } from 'react';
import { Col, Container, Row, Alert } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const LoggedInScreen = ({history}) => {
    const userSignIn = useSelector((state) => state.userSignIn);
    const { userInfo } = userSignIn;

    useEffect(()=> {
      if( !userInfo){
        history.push('/signin')
      }
    }, [userInfo, history])
    return (
        <Container>
        <Row>
            <Col >
            <Alert variant="success">
               <h1 className="text-center">Your are Logged In</h1> 
            </Alert>
            
            </Col>
        </Row>
    </Container>
    );
};

export default LoggedInScreen;