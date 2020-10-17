import React,{useState} from'react';
import {Formik} from 'formik';
import {Form,Button,Alert} from 'react-bootstrap';

const SetContractParameters=(props)=>{
  const [show,setShow]=useState(false);
  const [transactionInfo,setTransactionInfo]=useState({});
  const toggleShow=()=>setShow(!show);
  return (
    <div>
    <Alert variant="info" show={show} onClose={() => setShow(false)} dismissible>
            <Alert.Heading>Contract parameters set</Alert.Heading>
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
          latitude:'',
          longitude:'',
          leadTime:'',
          paymentAmount:''
        }}
    onSubmit={async (values,{setSubmitting, resetForm})=>{
             setSubmitting(true);
                setTimeout(() => {
                      resetForm();
                      setSubmitting(false);
                   }, 500);
          try
          {
            let success=await props.contract.methods.setContractParameters([values.latitude,values.longitude],values.leadTime,values.paymentAmount).send({from:props.accounts[0]});
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
    </div>
    )
}

export default SetContractParameters;