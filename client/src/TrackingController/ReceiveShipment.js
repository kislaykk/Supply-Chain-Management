import React from'react';
import {useFormik} from 'formik';

const ReceiveShipment=(props)=>{
	const formik=useFormik({
		initialValues:{
			trackingId:'',
			itemName:'',
			quantity:'',
			latitude:'',
			longitude:'',
		},
		onSubmit:values=>{
			props.contract.methods.receiveShipment(values.trackingId,values.itemName,values.quantity,[values.latitude,values.longitude]).send({from:props.accounts[0]})
			.then(success=>console.log(success))
			.catch(err=>console.log(err));
			
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
	       	<label htmlFor="itemName">itemName</label>
	       <input
	         id="itemName"
	         name="itemName"
	         type="text"
	         onChange={formik.handleChange}
	         value={formik.values.itemName}
	       />
	       <label htmlFor="quantity">quantity</label>
	       <input
	         id="quantity"
	         name="quantity"
	         type="text"
	         onChange={formik.handleChange}
	         value={formik.values.quantity}
	       />
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
	       
	       <button type="submit">Submit</button>
		</form>
		)
}

export default ReceiveShipment;