import React from 'react';
import { Col, Container, Row , Alert} from 'react-bootstrap';

const HomeScreen = () => {
    return (
        <Container>
            <Row>
                <Col >
                <Alert variant="primary">
                   <h1 className="text-center">Home Screen</h1> 
                </Alert>
                
                </Col>
            </Row>
        </Container>
    );
};

export default HomeScreen;