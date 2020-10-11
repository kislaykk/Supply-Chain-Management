import React from'react';
import {useFormik} from 'formik';

const CalculateReputation=(props)=>{
	const formik=useFormik({
		initialValues:{
			supplierAddress:'',
		},
		onSubmit:values=>{
			props.contract.methods.calculateReputation(values.supplierAddress).call()
			.then(success=>console.log(success))
			.catch(err=>console.log(err));
			
		},	


	});
	return(
		<form onSubmit={formik.handleSubmit}>
		<label htmlFor="supplierAddress">supplier Address</label>
	       <input
	         id="supplierAddress"
	         name="supplierAddress"
	         type="text"
	         onChange={formik.handleChange}
	         value={formik.values.supplierAddress}
	       />
	       
	       <button type="submit">Submit</button>
		</form>
		)
}

export default CalculateReputation