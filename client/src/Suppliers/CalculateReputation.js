import React,{useState} from'react';
import {Form,Button,Toast} from 'react-bootstrap';

import {Formik} from 'formik'; 
const CalculateReputation=(props)=>{
	 const [showA, setShowA] = useState(false);
	  const [toaster_message,setToaster_message]=useState('');
	  const toggleShowA = () => setShowA(!showA);
	  const setToastermes=(mes)=> setToaster_message(mes);
	return(
		<div>
		<Toast show={showA} onClose={toggleShowA}>
          <Toast.Header>
            <strong className="mr-auto">Reputation</strong>
            <small>{new Date().getHours() +":"+ new Date().getMinutes()}</small>
          </Toast.Header>
          <Toast.Body>{toaster_message}</Toast.Body>
        </Toast>
		<Formik 
		initialValues={{
					supplierAddress:''
				}}
		onSubmit={(values)=>{
					props.contract.methods.calculateReputation(values.supplierAddress).call()
					.then(success=>{
						let productInfo=`sucess-rate:${success}`;
              setToastermes(productInfo);
              toggleShowA();
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
		<Form.Label htmlFor="supplierAddress">supplier Address</Form.Label>
	       <Form.Control
	         id="supplierAddress"
	         name="supplierAddress"
	         type="text"
	         onChange={handleChange}
	         value={values.supplierAddress}
	       />
	       
	       <Button type="submit">Submit</Button>
		</Form>
		}
		</Formik>
		</div>
		)
}

export default CalculateReputation