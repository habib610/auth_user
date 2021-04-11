import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Col,
  Container,
  Form,
  Row,
  Spinner,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { userRegistrationAction } from "../Actions/userAction";

const RegistrationScreen = ({ history }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();

  const userSignIn = useSelector((state) => state.userSignIn);
  const { userInfo } = userSignIn;

  const userRegistration = useSelector((state) => state.userRegistration);
  const { loading, error } = userRegistration;

  useEffect(() => {
    if (userInfo && userInfo.email) {
      history.push("/loggedin");
    }
  }, [userInfo, history]);

  const handleRegistration = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Password doesn't match");
    } else {
      dispatch(
        userRegistrationAction(firstName, lastName, email, phone, password)
      );
    }
  };
  return (
    <Container>
      <Row>
        <Col md={6} className="offset-md-3">
          {error && <Alert variant="danger">{error}</Alert>}
          {loading && (
            <div className="d-flex justify-content-center my-2">
              <Spinner animation="border" variant="primary" />
            </div>
          )}
          <Form className="p-5 border rounded" onSubmit={handleRegistration}>
            <h1 className="text-center">Registration</h1>
            <Form.Group>
              <Form.Label>First Name</Form.Label>
              <Form.Control
                required
                onChange={(e) => setFirstName(e.target.value)}
                type="text"
                placeholder="First Name"
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                required
                onChange={(e) => setLastName(e.target.value)}
                type="text"
                placeholder="Last Name"
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                required
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Email"
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                required
                onChange={(e) => setPhone(e.target.value)}
                type="number"
                placeholder="Phone Number"
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                required
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Password"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                required
                onChange={(e) => setConfirmPassword(e.target.value)}
                type="password"
                placeholder="Confirm Password"
              />
            </Form.Group>
            <Button type="submit" variant="info btn-block">
              Submit
            </Button>
            <Form.Text className="text-center">
              Already Have Account? <Link to="/signin">Create Account</Link>{" "}
            </Form.Text>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default RegistrationScreen;
