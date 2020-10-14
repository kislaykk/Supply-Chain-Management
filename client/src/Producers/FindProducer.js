import React from'react';
import {Form,Button} from 'react-bootstrap';

import {Formik} from 'formik';  

const FindProducer=(props)=>{
  return(
    <Formik
    initialValues={{
          producer_address:'',
        }}
    onSubmit={async (values, {setSubmitting, resetForm})=>{
      setSubmitting(true);
      setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            resetForm();
            setSubmitting(false);
           }, 500);
      try{
        let vals=await props.contract.methods.findProducer(values.producer_address).call()
        if(vals['0']==='')
        {
          alert("no one with this Address");
        }
        else
        console.log(vals);

      }
      catch(err){
        alert("no one with this Address");
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
            <Form.Label >Producer's Address</Form.Label>
                 <Form.Control
                   id="producer_address"
                   name="producer_address"
                   type="text"
                   onChange={handleChange}
                   value={values.producer_address}
                 />
                 <Button type="submit">Find!</Button>
            </Form>
          )
    }
    </Formik>
    )
}

export default FindProducer