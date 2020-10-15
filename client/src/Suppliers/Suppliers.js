import React from 'react';
import GetContractParameters from "./GetContractParameters";
import AddSupplier from "./AddSupplier";
import FindSupplier from "./FindSupplier";
import SendShipment from "./SendShipment";
import CheckShipment from "./CheckShipment";
import CalculateReputation from "./CalculateReputation"
import CheckSuccess from "./CheckSuccess"
import DeleteSupplier from "./DeleteSupplier"
import DeleteShipment from "./DeleteShipment"
import GetAllSuppliers from "./GetAllSuppliers"
import {Tab,Nav,Row,Col} from 'react-bootstrap';

function Suppliers(props)
{
	
	return(
		<div>
		<h3>SUPPLIERS</h3>
		<Tab.Container defaultActiveKey="first">
                <Row>
                <Col sm={3}>
                        <Nav variant="pills" className="flex-column">
                                <Nav.Item>
                                        <Nav.Link eventKey="first">Get Contract Parameters</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                        <Nav.Link eventKey="second">Add Supplier</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                        <Nav.Link eventKey="third">Find Supplier</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                        <Nav.Link eventKey="forth">Send Shipment</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                        <Nav.Link eventKey="fifth">Check Shipment</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                        <Nav.Link eventKey="sixth">Check Success</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                        <Nav.Link eventKey="seventh">Delete Supplier</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                        <Nav.Link eventKey="eigth">Delete Shipment</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                        <Nav.Link eventKey="ninth">Get All Suppliers</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                        <Nav.Link eventKey="tenth">Calculate Reputation</Nav.Link>
                                </Nav.Item>
                        </Nav>
                </Col>
                
                <Col sm={9}>
                        <Tab.Content>
                                <Tab.Pane eventKey="first">
                                        <GetContractParameters contract={props.contract}/>
                                </Tab.Pane>
                                <Tab.Pane eventKey="second">
										<AddSupplier contract={props.contract} accounts={props.accounts}/>  
	                            </Tab.Pane>
                                <Tab.Pane eventKey="third">
                                        <FindSupplier contract={props.contract} />
                                </Tab.Pane>
                                <Tab.Pane eventKey="forth">
                                        <SendShipment contract={props.contract} accounts={props.accounts} />
                                </Tab.Pane>
                                <Tab.Pane eventKey="fifth">
                                        <CheckShipment contract={props.contract} />
                                </Tab.Pane>
                                <Tab.Pane eventKey="sixth">
                                        <CheckSuccess contract={props.contract}/>
                                </Tab.Pane>
                                <Tab.Pane eventKey="seventh">
                                        <DeleteSupplier contract={props.contract} accounts={props.accounts} />
                                </Tab.Pane>
                                <Tab.Pane eventKey="eigth">
                                        <DeleteShipment contract={props.contract} accounts={props.accounts} />
                                </Tab.Pane>
                                <Tab.Pane eventKey="ninth">
                                        <GetAllSuppliers contract={props.contract}/>
                                </Tab.Pane>
                                <Tab.Pane eventKey="tenth">
                                        <CalculateReputation contract={props.contract}/>
                                </Tab.Pane>

                                
                        </Tab.Content>
                </Col>
                </Row>
        </Tab.Container>
		</div>
	);
}
export default Suppliers;