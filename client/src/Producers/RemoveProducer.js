import React,{useState} from 'react';
import {Form,Button,Alert} from 'react-bootstrap';

import {Formik} from 'formik'; 
const RemoveProducer=(props)=>{
  const [show,setShow]=useState(false);
  const [transactionInfo,setTransactionInfo]=useState({});
  const toggleShow=()=>setShow(!show);
  return(
    <div>
    <Alert variant="danger" show={show} onClose={() => setShow(false)} dismissible>
            <Alert.Heading>Producer Removed</Alert.Heading>
            <p>
              transaction Hash:
              
              {transactionInfo.transactionHash}
              <br/>
              blockHash:
             
              {transactionInfo.blockHash}
              <br/>
              transaction from:
              
              {transactionInfo.from}
              <br/>
              transaction to:
              
              {transactionInfo.to}
              <br/>
              gas Used:
              
              {transactionInfo.gasUsed}
            </p>
          </Alert>
        
    <Formik
    initialValues={{
          producer_address:'',
        }}
    onSubmit={async (values, {setSubmitting, resetForm})=>{
      setSubmitting(true);
      setTimeout(() => {
            resetForm();
            setSubmitting(false);
           }, 500);
        try{
          let success=await props.contract.methods.removeProducer(values.producer_address).send({from:props.accounts[0]})
          let transactionHash=success.transactionHash;
          let blockHash=success.blockHash
          let from=success.from;
          let to= success.from;
          let gasUsed=success.gasUsed;
          let transaction={
            transactionHash,
            blockHash,
            from,
            to,
            gasUsed,
          }
          setTransactionInfo(transaction);
          setShow(true);


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
    </div>
    )
}

export default RemoveProducer;