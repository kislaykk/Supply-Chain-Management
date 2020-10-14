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

function Suppliers(props)
{
	return(
	    <div>
	    <h3>SUPPLIERS</h3>  
		<GetContractParameters contract={props.contract}/>
	    <br/>
	    <AddSupplier contract={props.contract} accounts={props.accounts}/>
	   	<br/>
		<FindSupplier contract={props.contract} />
	    <br/>
	    <SendShipment contract={props.contract} accounts={props.accounts} />
	 	<br/>
		<CheckShipment contract={props.contract} />
	    <br/>
		<CheckSuccess contract={props.contract}/>
	    <br/>
	    <DeleteSupplier contract={props.contract} accounts={props.accounts} />
	    <br/>
		<DeleteShipment contract={props.contract} accounts={props.accounts} />
		<br/>
		<GetAllSuppliers contract={props.contract}/>
		<br/>
		<CalculateReputation contract={props.contract}/>
       	<br/>
	    </div>
	    

	    );
}
export default Suppliers