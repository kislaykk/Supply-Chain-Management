import React from'react';
import {useFormik} from 'formik';

const CheckShipment=(props)=>{
  const formik=useFormik({
    initialValues:{
      trackingId:'',
    },
    onSubmit:async (values)=>{
      try{
        let vals=await props.contract.methods.checkShipment(values.trackingId).call()
        if(vals['1']==='')
        {
          alert("no one with this trackingId");
        }
        else
        console.log(vals);

      }
      catch(err){
        alert("no one with this trackingId");
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
         <button type="submit">Find</button>
    </form>
    )
}

export default CheckShipment