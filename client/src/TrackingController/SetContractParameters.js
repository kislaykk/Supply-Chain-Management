import React from'react';
import {Formik} from 'formik';
import {Form,Button} from 'react-bootstrap';
const SetContractParameters=(props)=>{
 
  return (
    <Formik
    initialValues={{
          latitude:'',
          longitude:'',
          leadTime:'',
          paymentAmount:''
        }}
    onSubmit={async (values)=>{
          try
          {
            let parametersSet=await props.contract.methods.setContractParameters([values.latitude,values.longitude],values.leadTime,values.paymentAmount).send({from:props.accounts[0]});
          }
          catch(err)
          {
            alert(err.message)
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
     <Form.Label htmlFor="leadTime">leadTime</Form.Label>
         <Form.Control
           id="leadTime"
           name="leadTime"
           type="text"
           onChange={handleChange}
           value={values.leadTime}
         />
      <Form.Label htmlFor="paymentAmount">paymentAmount</Form.Label>
         <Form.Control
           id="paymentAmount"
           name="paymentAmount"
           type="text"
           onChange={handleChange}
           value={values.paymentAmount}
         />
     <Button type="submit">Submit</Button>

    </Form>
    }
    </Formik>
    )
}

export default SetContractParameters;