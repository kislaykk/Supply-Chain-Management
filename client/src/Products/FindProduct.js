import React,{useState} from'react';
import {Form,Button,Toast} from 'react-bootstrap';

import {Formik} from 'formik'; 

const FindProduct=(props)=>{
  const [showA, setShowA] = useState(false);
  const [toaster_message,setToaster_message]=useState('');
  const toggleShowA = () => setShowA(!showA);
  const setToastermes=(mes)=> setToaster_message(mes);
  return (
    <div>
    <Toast show={showA} onClose={toggleShowA}>
          <Toast.Header>
            <img
              
              className="rounded mr-2"
              alt=""
            />
            <strong className="mr-auto">Result</strong>
            <small>{new Date().getHours() +":"+ new Date().getMinutes()}</small>
          </Toast.Header>
          <Toast.Body>{toaster_message}</Toast.Body>
        </Toast>
    <Formik
    initialValues={{
          serialNo:'',
        }}
    onSubmit={async (values)=>{
          try{
            let vals=await props.contract.methods.findProduct(values.serialNo).call()
            if(vals['1']==='')
            {
              setToastermes("No one with this address");
              toggleShowA();
            }
            else
            {
              let productInfo=`producer: ${vals['0']}
              product:${vals['1']}
              latitude:${vals['2'][0]}
              longitude:${vals['2'][1]}
              timestamp:${vals['3']}`;
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
    </div>
    )
}

export default FindProduct