import React,{useState} from'react';
import {Formik} from 'formik';
import {Form,Button,Alert} from 'react-bootstrap';

const SendEthToContract=(props)=>{
	const [show,setShow]=useState(false);
  const [transactionInfo,setTransactionInfo]=useState({});
  const toggleShow=()=>setShow(!show);
  return(
    <div>
    <Alert variant="info" show={show} onClose={() => setShow(false)} dismissible>
            <Alert.Heading>Sent to Contract!</Alert.Heading>
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
                    eths:'',
                }}
            onSubmit={async (values,{setSubmitting, resetForm})=>{
                      setSubmitting(true);
              setTimeout(() => {
                    resetForm();
                    setSubmitting(false);
                   }, 500);

                try{
                let success=await props.web3.eth.sendTransaction({from:props.accounts[0],to:props.contract._address,value:values.eths})
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
    </div>
    )
}

export default SendEthToContract;