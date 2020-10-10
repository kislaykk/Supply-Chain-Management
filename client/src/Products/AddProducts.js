import React from'react';
import {useFormik} from 'formik';

const AddProducts=(props)=>{
	const formik=useFormik({
		initialValues:{
			serialNo:'',
			productName:'',
			latitude:'',
			longitute:'',
		},
		onSubmit:async(values)=>{
			try{
			let vals=await props.contract.methods.addProduct(values.serialNo,values.productName,[values.latitude,values.longitute]).send({from:props.accounts[0]})
			console.log(vals)
			}
			catch(err)
			{
				console.log(err)
			}
			
			
		},	


	});
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
	       <label htmlFor="productName">productName</label>
	       <input
	         id="productName"
	         name="productName"
	         type="text"
	         onChange={formik.handleChange}
	         value={formik.values.productName}
	       />
	       <label htmlFor="latitude">latitude</label>
	       <input
	         id="latitude"
	         name="latitude"
	         type="latitude"
	         onChange={formik.handleChange}
	         value={formik.values.latitude}
	       />
	       <label htmlFor="longitute">longitute</label>
	       <input
	         id="longitute"
	         name="longitute"
	         type="longitute"
	         onChange={formik.handleChange}
	         value={formik.values.longitute}
	       />
	       <button type="submit">Add Product</button>
		</form>
		)
}

export default AddProducts;