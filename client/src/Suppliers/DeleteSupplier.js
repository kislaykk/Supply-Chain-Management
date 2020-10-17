import React,{useState} from 'react';
import {Formik} from 'formik';
import {Form,Button,Alert} from 'react-bootstrap';

const DeleteSupplier=(props)=>{
    const [show,setShow]=useState(false);
  const [transactionInfo,setTransactionInfo]=useState({});
  const toggleShow=()=>setShow(!show);
  return(
    <div>
    <Alert variant="danger" show={show} onClose={() => setShow(false)} dismissible>
            <Alert.Heading>Supplier Removed</Alert.Heading>
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
          supplier_address:'',
        }}
    onSubmit={async (values)=>{
          try{
            let success=await props.contract.methods.deleteSupplier(values.supplier_address).send({from:props.accounts[0]})
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
    </div>
    )
}

export default DeleteSupplier