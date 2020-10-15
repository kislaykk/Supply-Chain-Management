import React from 'react';
import {Formik} from 'formik';
import {Form,Button} from 'react-bootstrap'

const SendEthToContract=(props)=>{
	
  return(
    <Formik
    initialValues={{
              eths:'',
          }}
      onSubmit={async (values)=>{
              try{
                console.log(props.contract._address)
                let vals=await props.web3.eth.sendTransaction({from:props.accounts[0],to:props.contract._address,value:values.eths})
                console.log(vals);
      
              }
              catch(err){
                alert(err.message);
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
        <Form.Label htmlFor="eths">Amount</Form.Label>
             <Form.Control
               id="eths"
               name="eths"
               type="text"
               onChange={handleChange}
               value={values.eths}
             />
             <Button variant="success"type="submit">Send to contract</Button>
        </Form>}
    </Formik>
    )
}

export default SendEthToContract;