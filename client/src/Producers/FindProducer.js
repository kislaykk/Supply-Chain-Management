import React from'react';
import {useFormik} from 'formik';

const FindProducer=(props)=>{
  const formik=useFormik({
    initialValues:{
      producer_address:'',
    },
    onSubmit:async (values)=>{
      try{
        let vals=await props.contract.methods.findProducer(values.producer_address).call()
        if(vals['0']==='')
        {
          alert("no one with this Address");
        }
        else
        console.log(vals);

      }
      catch(err){
        alert("no one with this Address");
      }
            
      
      
    },  


  });
  return(
    <form onSubmit={formik.handleSubmit}>
    <label htmlFor="producer_address">Producer's Address</label>
         <input
           id="producer_address"
           name="producer_address"
           type="text"
           onChange={formik.handleChange}
           value={formik.values.producer_address}
         />
         <button type="submit">Submit</button>
    </form>
    )
}

export default FindProducer