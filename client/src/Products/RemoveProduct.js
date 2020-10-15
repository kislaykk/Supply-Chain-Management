import React from 'react';
import {Formik} from 'formik';
import {Form,Button} from 'react-bootstrap';

const RemoveProduct=(props)=>{
  return (
    <Formik
    initialValues={{
          serialNo:'',
        }}
    onSubmit={async (values)=>{
            try{
              let vals=await props.contract.methods.removeProduct(values.serialNo).send({from:props.accounts[0]})
              console.log(vals);
    
            }
            catch(err){
              alert(err.message);
            }  
          }}
    >
    {
      ({
        values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting 
          })=>(
          <Form onSubmit={handleSubmit}>
          <Form.Label htmlFor="serialNo">serialNo</Form.Label>
               <Form.Control
                 id="serialNo"
                 name="serialNo"
                 type="text"
                 onChange={handleChange}
                 value={values.serialNo}
               />
               <Button variant="danger" type="submit">Remove</Button>
          </Form>
          )
    }
    </Formik>
    )
}

export default RemoveProduct;