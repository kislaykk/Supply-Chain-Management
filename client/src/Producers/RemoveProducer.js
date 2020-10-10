import React from 'react';
import {useFormik} from 'formik';

const RemoveProducer=(props)=>{
	const formik=useFormik({
		initialValues:{
      		producer_address:'',
    	},
	    onSubmit:async (values)=>{
	      try{
	        let vals=await props.contract.methods.removeProducer(values.producer_address).send({from:props.accounts[0]})
	        console.log(vals);

	      }
	      catch(err){
	        alert(err.message);
	      }  
	    },
	})

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
         <button type="submit">Remove</button>
    </form>
    )
}

export default RemoveProducer;