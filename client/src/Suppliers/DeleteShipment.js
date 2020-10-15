import React from'react';
import {Formik} from 'formik';
import {Form,Button} from 'react-bootstrap';

const DeleteShipment=(props)=>{
 
  return(
    <Formik
    initialValues={{
          trackingId:'',
        }}
    onSubmit={async (values)=>{
          try{
            let vals=await props.contract.methods.deleteShipment(values.trackingId).send({from:props.accounts[0]})
            
            console.log(vals);
    
          }
          catch(err){
            console.log(err)
          }  
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
    <Form.Label >trackingId</Form.Label>
         <Form.Control
           id="trackingId"
           name="trackingId"
           type="text"
           onChange={handleChange}
           value={values.trackingId}
         />
         <Button variant="danger" type="submit">Delete</Button >
    </Form>
  }

    </Formik>
    )
}

export default DeleteShipment