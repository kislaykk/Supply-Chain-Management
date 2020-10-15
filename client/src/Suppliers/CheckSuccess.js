import React from'react';
import {Formik} from 'formik';
import {Form,Button} from 'react-bootstrap';

const CheckSuccess=(props)=>{


	return(
		<Formik
		initialValues={{
					supplierAddress:'',
				}}
		onSubmit={values=>{
					props.contract.methods.checkSuccess(values.supplierAddress).call()
					.then(success=>console.log(success))
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
		<Form.Label >supplier Address</Form.Label>
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
		)
}

export default CheckSuccess