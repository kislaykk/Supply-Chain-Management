import React from 'react';
import AddProducts from "./AddProducts";
import FindProduct from "./FindProduct";
import RemoveProduct from "./RemoveProduct";
import {Tab,Nav,Row,Col} from 'react-bootstrap';

function Products(props)
{
	return(
		<div>
		<h3>PRODUCTS</h3>
		<Tab.Container defaultActiveKey="first">
                <Row>
                <Col sm={3}>
                        <Nav variant="pills" className="flex-column">
                                <Nav.Item>
                                        <Nav.Link eventKey="first">Add Product</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                        <Nav.Link eventKey="second">Find Product</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                        <Nav.Link eventKey="third">Remove Product</Nav.Link>
                                </Nav.Item>
                        </Nav>
                </Col>
                
                <Col sm={9}>
                        <Tab.Content>
                                <Tab.Pane eventKey="first">
                                        <AddProducts contract={props.contract} accounts={props.accounts}/>
                                </Tab.Pane>
                                <Tab.Pane eventKey="second">
                                        <FindProduct contract={props.contract} />
                                </Tab.Pane>
                                <Tab.Pane eventKey="third">
                                        <RemoveProduct contract={props.contract} accounts={props.accounts}/>
                                </Tab.Pane>
                                
                        </Tab.Content>
                </Col>
                </Row>
        </Tab.Container>
		</div>
		);
	
	
}

export default Products;