import React from 'react';
import RegisterProducer from "./RegisterProducer";
import FindProducer from "./FindProducer";
import CertifyProducer from "./CertifyProducer";
import RemoveProducer from "./RemoveProducer"

function Producers(props)
{
	return(
		<div>
		<RegisterProducer contract={props.contract} accounts={props.accounts}/>
        <br/>
        <FindProducer contract={props.contract} />
        <br/>
        <CertifyProducer contract={props.contract} accounts={props.accounts}/>
        <br/>
        <RemoveProducer contract={props.contract} accounts={props.accounts}/>
        <br/>
		</div>
	);

        
}

export default Producers;