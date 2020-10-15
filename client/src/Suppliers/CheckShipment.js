import React from'react';
import {Formik} from 'formik';
import {Form,Button} from 'react-bootstrap';
const CheckShipment=(props)=>{
 
  return(
    <Formik
    initialValues={{
          trackingId:'',
        }}
    onSubmit={async (values)=>{
          try{
            let vals=await props.contract.methods.checkShipment(values.trackingId).call()
            if(vals['1']==='')
            {
              alert("no one with this trackingId");
            }
            else
            console.log(vals);
    
          }
          catch(err){
            alert("no one with this trackingId");
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
         <Button type="submit">Find</Button>
    </Form>
    }
    </Formik>
    )
}

export default CheckShipment