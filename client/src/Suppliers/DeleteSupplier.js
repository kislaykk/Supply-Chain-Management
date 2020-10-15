import React from'react';
import {Formik} from 'formik';
import {Form,Button} from 'react-bootstrap';

const DeleteSupplier=(props)=>{
 
  return(
    <Formik
    initialValues={{
          supplier_address:'',
        }}
    onSubmit={async (values)=>{
          try{
            let vals=await props.contract.methods.deleteSupplier(values.supplier_address).send({from:props.accounts[0]})
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
        <Form.Label htmlFor="supplier_address">supplier's Address</Form.Label>
             <Form.Control
               id="supplier_address"
               name="supplier_address"
               type="text"
               onChange={handleChange}
               value={values.supplier_address}
             />
             <Button variant="danger" type="submit">Delete</Button>
        </Form>}
    </Formik>
    )
}

export default DeleteSupplier