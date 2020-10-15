import React from'react';
import {Formik} from 'formik';
import {Form,Button} from 'react-bootstrap';

const FindProduct=(props)=>{
  return (
    <Formik
    initialValues={{
          serialNo:'',
        }}
    onSubmit={async (values)=>{
          try{
            let vals=await props.contract.methods.findProduct(values.serialNo).call()
            if(vals['1']==='')
            {
              alert("no one with this serialNo");
            }
            else
            console.log(vals);
    
          }
          catch(err){
            alert("no one with this serialNo");
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
               <Button type="submit">Find</Button>
          </Form>
          )
    }
    </Formik>
    )
}

export default FindProduct