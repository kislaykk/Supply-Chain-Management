import React,{useState} from'react';
import {Form,Button,Toast} from 'react-bootstrap';

import {Formik} from 'formik';  

const FindProducer=(props)=>{
  const [showA, setShowA] = useState(false);
  const [toaster_message,setToaster_message]=useState('');
  const toggleShowA = () => setShowA(!showA);
  const setToastermes=(mes)=> setToaster_message(mes);
  return(
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
          producer_address:'',
        }}
    onSubmit={async (values, {setSubmitting, resetForm})=>{
      
      setSubmitting(true);
      setTimeout(() => {
            resetForm();
            setSubmitting(false);
           }, 500);
      try{
        let vals=await props.contract.methods.findProducer(values.producer_address).call()
        if(vals['0']==='')
        {
          setToastermes("No one with this address");
          toggleShowA();

        }
        else
        {
          let producerInfo=`name:${vals['0']}
          phoneNo:${vals['1']}
          city-state:${vals['2']}
          country:${vals['3']}
          certified:${vals['4']}`
          setToastermes(producerInfo);
          toggleShowA();
        };

      }
      catch(err){
        setToastermes("No one with this address");
        toggleShowA();
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
                 <Button type="submit">Find!</Button>
            </Form>
          )
    }
    </Formik>
    </div>
    )
}

export default FindProducer