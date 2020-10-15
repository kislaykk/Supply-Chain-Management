import React from'react';
import {Formik} from 'formik';
import {Form,Button} from 'react-bootstrap';

const AddSupplier=(props)=>{
	
	return(
		<Formik
		initialValues={{
					name:'',
					phoneNo:'',
					cityState:'',
					country:'',
				}}
		onSubmit={(values)=>{
					props.contract.methods.addSupplier(values.name,values.phoneNo,values.cityState,values.country).send({from:props.accounts[0]})
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
		)
}

export default AddSupplier