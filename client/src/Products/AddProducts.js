import React,{useState} from'react';
import {Formik} from 'formik';
import {Form,Button,Alert} from 'react-bootstrap';

const AddProducts=(props)=>{
	const [show,setShow]=useState(false);
  const [transactionInfo,setTransactionInfo]=useState({});
  const toggleShow=()=>setShow(!show);
	return(
		<div>
		<Alert variant="info" show={show} onClose={() => setShow(false)} dismissible>
            <Alert.Heading>Product Added</Alert.Heading>
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
						serialNo:'',
						productName:'',
						latitude:'',
						longitute:'',
					}}
			onSubmit={async (values,{setSubmitting, resetForm})=>{
             setSubmitting(true);
                setTimeout(() => {
                      resetForm();
                      setSubmitting(false);
                   }, 500);
							try{
							let success=await props.contract.methods.addProduct(values.serialNo,values.productName,[values.latitude,values.longitute]).send({from:props.accounts[0]})
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
							}
							catch(err)
							{
								console.log(err)
							}
						}}
		>
		{
			({values,
	          errors,
	          touched,
	          handleChange,
	          handleBlur,
	          handleSubmit,
	          isSubmitting })=>(
      	<Form onSubmit={handleSubmit}>
		<Form.Label htmlFor="serialNo">serialNo</Form.Label>
	       <Form.Control
	         id="serialNo"
	         name="serialNo"
	         type="text"
	         onChange={handleChange}
	         value={values.serialNo}
	       />
	       <Form.Label htmlFor="productName">productName</Form.Label>
	       <Form.Control
	         id="productName"
	         name="productName"
	         type="text"
	         onChange={handleChange}
	         value={values.productName}
	       />
	       <Form.Label htmlFor="latitude">latitude</Form.Label>
	       <Form.Control
	         id="latitude"
	         name="latitude"
	         type="text"
	         onChange={handleChange}
	         value={values.latitude}
	       />
	       <Form.Label htmlFor="longitute">longitute</Form.Label>
	       <Form.Control
	         id="longitute"
	         name="longitute"
	         type="text"
	         onChange={handleChange}
	         value={values.longitute}
	       />
	       <Button type="submit">Add Product</Button>
		</Form>
	          )
		}
		</Formik>
		</div>
		)
}

export default AddProducts;