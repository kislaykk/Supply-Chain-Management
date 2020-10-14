import React from 'react';
import BalanceOfContract from "./BalanceOfContract";
import SendEthToContract from "./SendEthToContract";
import SetContractParameters from "./SetContractParameters";
import ReceiveShipment from "./ReceiveShipment";

function Contract(props)
{
	return(
		<div>
		<h3>CONTRACT</h3> 
		<BalanceOfContract contract={props.contract}/>
		<br/>
		<SendEthToContract contract={props.contract} accounts={props.accounts} web3={props.web3}/>
		<br/>
		<SetContractParameters contract={props.contract} accounts={props.accounts}/>
		<br/>
		<ReceiveShipment contract={props.contract} accounts={props.accounts} />
		</div>
	);
	   

}

export default Contract;