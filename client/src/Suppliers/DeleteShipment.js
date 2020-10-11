import React from'react';
import {useFormik} from 'formik';

const DeleteShipment=(props)=>{
  const formik=useFormik({
    initialValues:{
      trackingId:'',
    },
    onSubmit:async (values)=>{
      try{
        let vals=await props.contract.methods.deleteShipment(values.trackingId).send({from:props.accounts[0]})
        
        console.log(vals);

      }
      catch(err){
        console.log(err)
      }
            
      
      
    },  


  });
  return(
    <form onSubmit={formik.handleSubmit}>
    <label htmlFor="trackingId">trackingId</label>
         <input
           id="trackingId"
           name="trackingId"
           type="text"
           onChange={formik.handleChange}
           value={formik.values.trackingId}
         />
         <button type="submit">Delete</button>
    </form>
    )
}

export default DeleteShipment