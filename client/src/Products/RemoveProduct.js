import React from 'react';
import {useFormik} from 'formik';

const RemoveProduct=(props)=>{
	const formik=useFormik({
		initialValues:{
      		serialNo:'',
    	},
	    onSubmit:async (values)=>{
	      try{
	        let vals=await props.contract.methods.removeProduct(values.serialNo).send({from:props.accounts[0]})
	        console.log(vals);

	      }
	      catch(err){
	        alert(err.message);
	      }  
	    },
	})

  return(
    <form onSubmit={formik.handleSubmit}>
    <label htmlFor="serialNo">serialNo</label>
         <input
           id="serialNo"
           name="serialNo"
           type="text"
           onChange={formik.handleChange}
           value={formik.values.serialNo}
         />
         <button type="submit">Remove</button>
    </form>
    )
}

export default RemoveProduct;