import React,{useState} from 'react';
import {Formik} from 'formik';
import {Form,Button,Alert} from 'react-bootstrap';

const DeleteShipment=(props)=>{
   const [show,setShow]=useState(false);
  const [transactionInfo,setTransactionInfo]=useState({});
  const toggleShow=()=>setShow(!show);
  return(
    <div>
    <Alert variant="danger" show={show} onClose={() => setShow(false)} dismissible>
            <Alert.Heading>Shipment Removed</Alert.Heading>
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
          trackingId:'',
        }}
    onSubmit={async (values,{setSubmitting, resetForm})=>{
             setSubmitting(true);
                setTimeout(() => {
                      resetForm();
                      setSubmitting(false);
                   }, 500);
          try{
            let success=await props.contract.methods.deleteShipment(values.trackingId).send({from:props.accounts[0]})
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
         <Button variant="danger" type="submit">Delete</Button >
    </Form>
  }

    </Formik>
    </div>
    )
}

export default DeleteShipment;