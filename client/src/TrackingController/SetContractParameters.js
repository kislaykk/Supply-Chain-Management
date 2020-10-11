import React from'react';
import {useFormik} from 'formik';

const SetContractParameters=(props)=>{
  const formik=useFormik({
    initialValues:{
      latitude:'',
      longitude:'',
      leadTime:'',
      paymentAmount:''
    },
    onSubmit:async (values)=>{
      try
      {
      	let parametersSet=await props.contract.methods.setContractParameters([values.latitude,values.longitude],values.leadTime,values.paymentAmount).send({from:props.accounts[0]});
      }
      catch(err)
      {
      	alert(err.message)
      }
    },  


  });
  return(
    <form onSubmit={formik.handleSubmit}>
     <label htmlFor="latitude">latitude</label>
     <input
       id="latitude"
       name="latitude"
       type="text"
       onChange={formik.handleChange}
       value={formik.values.latitude}
     />
    <label htmlFor="longitude">longitude</label>
         <input
           id="longitude"
           name="longitude"
           type="text"
           onChange={formik.handleChange}
           value={formik.values.longitude}
         />
     <label htmlFor="leadTime">leadTime</label>
         <input
           id="leadTime"
           name="leadTime"
           type="text"
           onChange={formik.handleChange}
           value={formik.values.leadTime}
         />
      <label htmlFor="paymentAmount">paymentAmount</label>
         <input
           id="paymentAmount"
           name="paymentAmount"
           type="text"
           onChange={formik.handleChange}
           value={formik.values.paymentAmount}
         />
     <button type="submit">Submit</button>

    </form>
    )
}

export default SetContractParameters;