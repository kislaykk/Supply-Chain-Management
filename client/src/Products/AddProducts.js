import React from'react';
import {Formik} from 'formik';
import {Form,Button} from 'react-bootstrap';

const AddProducts=(props)=>{

	return(
		<Formik
			initialValues={{
						serialNo:'',
						productName:'',
						latitude:'',
						longitute:'',
					}}
			onSubmit={async (values)=>{
							try{
							let vals=await props.contract.methods.addProduct(values.serialNo,values.productName,[values.latitude,values.longitute]).send({from:props.accounts[0]})
							console.log(vals)
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
		)
}

export default AddProducts;