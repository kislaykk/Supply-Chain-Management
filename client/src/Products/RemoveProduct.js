import React,{useState} from 'react';
import {Formik} from 'formik';
import {Form,Button,Alert} from 'react-bootstrap';

const RemoveProduct=(props)=>{
  const [show,setShow]=useState(false);
  const [transactionInfo,setTransactionInfo]=useState({});
  const toggleShow=()=>setShow(!show);
  return (
    <div>
    <Alert variant="danger" show={show} onClose={() => setShow(false)} dismissible>
            <Alert.Heading>Product Removed</Alert.Heading>
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
          serialNo:'',
        }}
    onSubmit={async (values)=>{
            try{
              let success=await props.contract.methods.removeProduct(values.serialNo).send({from:props.accounts[0]})
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
    </div>
    )
}

export default RemoveProduct;