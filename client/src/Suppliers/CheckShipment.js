import React,{useState} from'react';
import {Form,Button,Toast} from 'react-bootstrap';

import {Formik} from 'formik';const CheckShipment=(props)=>{
    const [showA, setShowA] = useState(false);
  const [toaster_message,setToaster_message]=useState('');
  const toggleShowA = () => setShowA(!showA);
  const setToastermes=(mes)=> setToaster_message(mes);
  return(
    <div>
    <Toast show={showA} onClose={toggleShowA}>
          <Toast.Header>
            <strong className="mr-auto">Shipment</strong>
            <small>{new Date().getHours() +":"+ new Date().getMinutes()}</small>
          </Toast.Header>
          <Toast.Body>{toaster_message}</Toast.Body>
        </Toast>
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
            let vals=await props.contract.methods.checkShipment(values.trackingId).call()
            if(!vals['0'])
            {
              setToastermes("No one with this address");
              toggleShowA();
            }
            else
            {
              let productInfo=`itemName: ${vals['0']}
              quantity: ${vals['1']}
              latitude: ${vals['2'][0]}
              longitude: ${vals['2'][1]}
              timestamp: ${vals['3']}
              payment-done: ${vals['4']}
              supplier: ${vals['5']}`;
              setToastermes(productInfo);
              toggleShowA();

            }
    
          }
          catch(err){
            setToastermes("No one with this address");
              toggleShowA();
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
         <Button type="submit">Find</Button>
    </Form>
    }
    </Formik>
    </div>
    )
}

export default CheckShipment