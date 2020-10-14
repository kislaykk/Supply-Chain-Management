import React from'react';
import {Form,Button} from 'react-bootstrap';

import {Formik} from 'formik';	

const RegisterProducer=(props)=>{
	return(

		<Formik
		initialValues={{
					name:'',
					phoneNo:'',
					cityState:'',
					country:'',
				}}
		onSubmit={(values, {setSubmitting, resetForm})=>{
			setSubmitting(true);
			setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            resetForm();
            setSubmitting(false);
         	 }, 500);
			props.contract.methods.addProducer(values.name,values.phoneNo,values.cityState,values.country).send({from:props.accounts[0]})
			.then(success=>console.log(success))
			.catch(err=>console.log(err));
			
		}}
		>
		{({values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting })=>(
							<Form onSubmit={handleSubmit}>
				
							<Form.Label >name</Form.Label>
							<Form.Control
							 id="name"
							 name="name"
							 type="text"
							 onChange={handleChange}
							 value={values.name}
							/>
							<Form.Label >phoneNo</Form.Label>
							<Form.Control
							 id="phoneNo"
							 name="phoneNo"
							 type="text"
							 onChange={handleChange}
							 value={values.phoneNo}
							/>
							<Form.Label >cityState</Form.Label>
							<Form.Control
							 id="cityState"
							 name="cityState"
							 type="text"
							 onChange={handleChange}
							 value={values.cityState}
							/>
							<Form.Label >country</Form.Label>
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

export default RegisterProducer;