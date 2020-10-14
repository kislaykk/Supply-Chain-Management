import React from 'react';
import RegisterProducer from "./RegisterProducer";
import FindProducer from "./FindProducer";
import CertifyProducer from "./CertifyProducer";
import RemoveProducer from "./RemoveProducer"

import {Tab,Nav,Row,Col} from 'react-bootstrap';
function Producers(props)
{
       
	return(
	<div>
        <h3>PRODUCERS</h3>
        <Tab.Container defaultActiveKey="first">
                <Row>
                <Col sm={3}>
                        <Nav variant="pills" className="flex-column">
                                <Nav.Item>
                                        <Nav.Link eventKey="first">Register Producer</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                        <Nav.Link eventKey="second">Find Producer</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                        <Nav.Link eventKey="third">Certify Producer</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                        <Nav.Link eventKey="fourth">Remove Producer</Nav.Link>
                                </Nav.Item>
                        </Nav>
                </Col>
                
                <Col sm={9}>
                        <Tab.Content>
                                <Tab.Pane eventKey="first">
                                        <RegisterProducer contract={props.contract} accounts={props.accounts}/>
                                </Tab.Pane>
                                <Tab.Pane eventKey="second">
                                        <FindProducer contract={props.contract} />
                                </Tab.Pane>
                                <Tab.Pane eventKey="third">
                                        <CertifyProducer contract={props.contract} accounts={props.accounts}/>
                                </Tab.Pane>
                                <Tab.Pane eventKey="fourth">
                                        <RemoveProducer contract={props.contract} accounts={props.accounts}/>
                                </Tab.Pane>
                        </Tab.Content>
                </Col>
                </Row>
        </Tab.Container>
        
	</div>
	);

        
}

export default Producers;