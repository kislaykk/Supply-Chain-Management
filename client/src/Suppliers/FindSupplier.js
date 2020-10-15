import React from'react';
import {Formik} from 'formik';
import {Form,Button} from 'react-bootstrap';

const FindSupplier=(props)=>{
  
  return(
    <Formik
    initialValues={{
          supplier_address:'',
        }}
    onSubmit={async (values)=>{
          try{
            let vals=await props.contract.methods.findSupplier(values.supplier_address).call()
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
      <Form.Label >supplier's Address</Form.Label>
         <Form.Control
           id="supplier_address"
           name="supplier_address"
           type="text"
           onChange={handleChange}
           value={values.supplier_address}
         />
         <Button type="submit">Find!</Button>
    </Form>
    }

    </Formik>
    )
}

export default FindSupplier