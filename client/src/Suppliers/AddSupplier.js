import React,{useState} from'react';
import {Formik} from 'formik';
import {Form,Button,Alert} from 'react-bootstrap';

const AddSupplier=(props)=>{
const [show,setShow]=useState(false);
  const [transactionInfo,setTransactionInfo]=useState({});
  const toggleShow=()=>setShow(!show);
	return(
		<div>
		<Alert variant="info" show={show} onClose={() => setShow(false)} dismissible>
            <Alert.Heading>Supplier Added</Alert.Heading>
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
            </p>
          </Alert>
		<Formik
		initialValues={{
					name:'',
					phoneNo:'',
					cityState:'',
					country:'',
				}}
		onSubmit={(values)=>{
					props.contract.methods.addSupplier(values.name,values.phoneNo,values.cityState,values.country).send({from:props.accounts[0]})
					.then(success=>{
						let transactionHash=success.transactionHash;
              let blockHash=success.blockHash
              let from=success.from;
              let to= success.from;
              let gasUsed=success.gasUsed;
              let transaction={
                transactionHash,
                blockHash,
                from,
                to,
                gasUsed,
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
				})=>(
				<Form onSubmit={handleSubmit}>
				<Form.Label htmlFor="name">name</Form.Label>
			       <Form.Control
			         id="name"
			         name="name"
			         type="text"
			         onChange={handleChange}
			         value={values.name}
			       />
			       <Form.Label htmlFor="phoneNo">phoneNo</Form.Label>
			       <Form.Control
			         id="phoneNo"
			         name="phoneNo"
			         type="text"
			         onChange={handleChange}
			         value={values.phoneNo}
			       />
			       <Form.Label htmlFor="cityState">cityState</Form.Label>
			       <Form.Control
			         id="cityState"
			         name="cityState"
			         type="text"
			         onChange={handleChange}
			         value={values.cityState}
			       />
			       <Form.Label htmlFor="country">country</Form.Label>
			       <Form.Control
			         id="country"
			         name="country"
			         type="text"
			         onChange={handleChange}
			         value={values.country}
			       />
			       <Button type="submit">Submit</Button>
				</Form>
				)}
		
		</Formik>
		</div>
		)
}

export default AddSupplier