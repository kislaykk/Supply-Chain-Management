import React from 'react';
import {useFormik} from 'formik';


const SendEthToContract=(props)=>{
	const formik=useFormik({
		initialValues:{
      		eths:'',
    	},
	    onSubmit:async (values)=>{
	      try{
          console.log(props.contract._address)
	        let vals=await props.web3.eth.sendTransaction({from:props.accounts[0],to:props.contract._address,value:values.eths})
	        console.log(vals);

	      }
	      catch(err){
	        alert(err.message);
	      }  
	    },
	})

  return(
    <form onSubmit={formik.handleSubmit}>
    <label htmlFor="eths">Amount</label>
         <input
           id="eths"
           name="eths"
           type="text"
           onChange={formik.handleChange}
           value={formik.values.eths}
         />
         <button type="submit">Send to contract</button>
    </form>
    )
}

export default SendEthToContract;