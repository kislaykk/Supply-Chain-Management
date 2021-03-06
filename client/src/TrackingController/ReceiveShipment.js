import React,{useState} from'react';
import {Formik} from  'formik'
import {Form,Button,Alert} from 'react-bootstrap';

const ReceiveShipment=(props)=>{
	const [show,setShow]=useState(false);
  	const [transactionInfo,setTransactionInfo]=useState({});
  	const toggleShow=()=>setShow(!show);
  	const [varianttype,setVarianttype]=useState("");
  	const changevariant=(type)=>setVarianttype(type);
  	const [paymentstat,setPaymentstat]=useState("");
  	const changePaymentstat=(stat)=>setPaymentstat(stat);
	return (
		<div>
		<Alert variant={varianttype} show={show} onClose={() => setShow(false)} dismissible>
            <Alert.Heading>{paymentstat}</Alert.Heading>
            <p>
              transaction Hash:
              
              {transactionInfo.transactionHash}
              <br/>
              blockHash:
             
              {transactionInfo.blockHash}
              <br/>
              transaction from:
              
              {transactionInfo.from}
              <br/>
              transaction to:
              
              {transactionInfo.to}
              <br/>
              gas Used:
              
              {transactionInfo.gasUsed}
              <br/>
              Payment:
              {transactionInfo.event}
            </p>
            </Alert>
		<Formik
		initialValues={{
					trackingId:'',
					itemName:'',
					quantity:'',
					latitude:'',
					longitude:'',
				}}
		onSubmit={async (values,{setSubmitting, resetForm})=>{
				setSubmitting(true);
                setTimeout(() => {
                      resetForm();
                      setSubmitting(false);
                   }, 500);
					props.contract.methods.receiveShipment(values.trackingId,values.itemName,values.quantity,[values.latitude,values.longitude]).send({from:props.accounts[0]})
					.then(success=>{
					console.log(success);
					let transactionHash=success.transactionHash;
                    let blockHash=success.blockHash
                    let from=success.from;
                    let to= success.from;
                    let gasUsed=success.gasUsed;
                    let event;
                    // console.log(success)
                    if(success.events.Failure) {
                    	event="Failure";
                    	changevariant("danger");
                    	changePaymentstat("Payment Failed");
                    }
                    else if (success.events.Payment && success.events.Success) {
                    	event="Payment successful";
                    	changevariant("success");
                    	changePaymentstat("Payment Successful");
                    }
                    let transaction={
                      transactionHash,
                      blockHash,
                      from,
                      to,
                      gasUsed,
                      event
                    }
                    setTransactionInfo(transaction);
                    setShow(true);
					})
					.catch(err=>console.log(err));
					
				}}
		>
		{({
			values,
			errors,
			touched,
			handleChange,
			handleBlur,
			handleSubmit,
			isSubmitting
		})=>
		<Form onSubmit={handleSubmit}>
			<Form.Label htmlFor="trackingId">trackingId</Form.Label>
	       <Form.Control
	         id="trackingId"
	         name="trackingId"
	         type="text"
	         onChange={handleChange}
	         value={values.trackingId}
	       />
	       <Form.Label htmlFor="itemName">itemName</Form.Label>
	       <Form.Control
	         id="itemName"
	         name="itemName"
	         type="text"
	         onChange={handleChange}
	         value={values.itemName}
	       />
	       <Form.Label htmlFor="quantity">quantity</Form.Label>
	       <Form.Control
	         id="quantity"
	         name="quantity"
	         type="text"
	         onChange={handleChange}
	         value={values.quantity}
	       />
	       <Form.Label htmlFor="latitude">latitude</Form.Label>
	       <Form.Control
	         id="latitude"
	         name="latitude"
	         type="text"
	         onChange={handleChange}
	         value={values.latitude}
	       />
	       <Form.Label htmlFor="longitude">longitude</Form.Label>
	       <Form.Control
	         id="longitude"
	         name="longitude"
	         type="text"
	         onChange={handleChange}
	         value={values.longitude}
	       />
	       
	       <Button type="submit">Submit</Button>
		</Form>
		}
		</Formik>
		</div>
		)
}

export default ReceiveShipment;