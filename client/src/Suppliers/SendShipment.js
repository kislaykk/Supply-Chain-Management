import React from'react';
import {Formik} from 'formik';
import {Form,Button} from 'react-bootstrap';
const SendShipment=(props)=>{
	

	return(
		<Formik
		initialValues={{
					trackingId:'',
					itemName:'',
					quantity:'',
					latitude:'',
					longitude:'',
				}}
		onSubmit={(values)=>{
					props.contract.methods.sendShipment(values.trackingId,values.itemName,values.quantity,[values.latitude,values.longitude]).send({from:props.accounts[0]})
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
		)
}

export default SendShipment;