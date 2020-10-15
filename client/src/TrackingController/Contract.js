import React from 'react';
import BalanceOfContract from "./BalanceOfContract";
import SendEthToContract from "./SendEthToContract";
import SetContractParameters from "./SetContractParameters";
import ReceiveShipment from "./ReceiveShipment";
import {Tab,Nav,Row,Col} from 'react-bootstrap';

function Contract(props)
{  
	return(
		<div>
		<h3>CONTRACT</h3>
		<Tab.Container defaultActiveKey="first">
                <Row>
                <Col sm={3}>
                        <Nav variant="pills" className="flex-column">
                                <Nav.Item>
                                        <Nav.Link eventKey="first">BalanceOfContract</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                        <Nav.Link eventKey="second">Send Ether To Contract</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                        <Nav.Link eventKey="third">Sert Contract Parameter</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                        <Nav.Link eventKey="forth">Receive Shipment</Nav.Link>
                                </Nav.Item>
                        </Nav>
                </Col>
                
                <Col sm={9}>
                        <Tab.Content>
                                <Tab.Pane eventKey="first">
                                        <BalanceOfContract contract={props.contract}/>
                                </Tab.Pane>
                                <Tab.Pane eventKey="second">
										<SendEthToContract contract={props.contract} accounts={props.accounts} web3={props.web3}/>
	                            </Tab.Pane>
                                <Tab.Pane eventKey="third">
                                        <SetContractParameters contract={props.contract} accounts={props.accounts}/>
                                </Tab.Pane>
                                <Tab.Pane eventKey="forth">
                                        <ReceiveShipment contract={props.contract} accounts={props.accounts} />
                                </Tab.Pane>  
                        </Tab.Content>
                </Col>
                </Row>
        </Tab.Container>
		</div>
	);
}

export default Contract;