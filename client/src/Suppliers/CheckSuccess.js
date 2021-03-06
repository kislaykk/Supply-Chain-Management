import React,{useState} from'react';
import {Form,Button,Toast} from 'react-bootstrap';

import {Formik} from 'formik'; 

const CheckSuccess=(props)=>{
	  const [showA, setShowA] = useState(false);
  const [toaster_message,setToaster_message]=useState('');
  const toggleShowA = () => setShowA(!showA);
  const setToastermes=(mes)=> setToaster_message(mes);

	return(
		<div>
		<Toast show={showA} onClose={toggleShowA}>
          <Toast.Header>
            <img
              
              className="rounded mr-2"
              alt=""
            />
            <strong className="mr-auto">Result</strong>
            <small>{new Date().getHours() +":"+ new Date().getMinutes()}</small>
          </Toast.Header>
          <Toast.Body>{toaster_message}</Toast.Body>
        </Toast>
		<Formik
		initialValues={{
					supplierAddress:'',
				}}
		onSubmit={(values,{setSubmitting, resetForm})=>{
             setSubmitting(true);
                setTimeout(() => {
                      resetForm();
                      setSubmitting(false);
                   }, 500);
					props.contract.methods.checkSuccess(values.supplierAddress).call()
					.then(vals=>{
						 let productInfo=`shipped-successfully: ${vals['0']}
			              shipped in total: ${vals['1']}`;
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
		</div>
		)
}

export default CheckSuccess