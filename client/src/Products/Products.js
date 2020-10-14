import React from 'react';
import AddProducts from "./AddProducts";
import FindProduct from "./FindProduct";
import RemoveProduct from "./RemoveProduct";

function Products(props)
{
	return(
		<div>
			<h3>PRODUCTS</h3>
			<AddProducts contract={props.contract} accounts={props.accounts}/>
		    <br/>
		    <FindProduct contract={props.contract} />
		    <br/>
		    <RemoveProduct contract={props.contract} accounts={props.accounts}/>
		</div>
	);
	
}

export default Products;