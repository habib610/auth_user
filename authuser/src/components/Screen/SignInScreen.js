import React, { useEffect, useState } from "react";
import { Col, Container, Form, Row , Button, Alert, Spinner} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { userSingInAction } from "../Actions/userAction";

const SignInScreen = ({history}) => {

  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const dispatch = useDispatch()

  const userSignIn = useSelector((state) => state.userSignIn);
  const { userInfo, loading, error } = userSignIn;

  useEffect(()=> {
    if( userInfo && userInfo.email){
      history.push('/loggedin')
    }
  }, [userInfo, history])

  const handleSingIn = async(e) => {
    e.preventDefault()
    dispatch(userSingInAction(email, password))
  }

  return (
    <Container>
      <Row>
        <Col md={6} className="offset-md-3 ">
          {
            error && <Alert  variant="danger">{error}</Alert>
          }
          {loading && (
            <div className="d-flex justify-content-center my-2">
              <Spinner animation="border" variant="primary" />
            </div>
          )}
          <Form className="p-5 border  rounded" onSubmit={handleSingIn}>
            <h1 className="text-center">SignIn</h1>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" required onChange={(e)=> setEmail(e.target.value)} placeholder="Email" />
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control required onChange={(e)=> setPassword(e.target.value)} type="password" placeholder="Password" />
            </Form.Group>
            <Button variant="info btn-block" type="submit">Submit</Button>
            <Form.Text className="text-center">Don't Have Account? <Link to="/registration">Create Account</Link> </Form.Text>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default SignInScreen;
