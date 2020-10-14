import React from 'react';
import {Form,Button} from 'react-bootstrap';

import {Formik} from 'formik';

const RemoveProducer=(props)=>{

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
          let vals=await props.contract.methods.removeProducer(values.producer_address).send({from:props.accounts[0]})
          console.log(vals);

        }
        catch(err){
          alert(err.message);
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
                 <Button type="submit" variant="danger">Remove</Button>
            </Form>
          )
    }
    </Formik>
    )
}

export default RemoveProducer;