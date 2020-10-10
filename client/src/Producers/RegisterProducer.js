import React from'react';
import {useFormik} from 'formik';

const RegisterProducer=(props)=>{
	const formik=useFormik({
		initialValues:{
			name:'',
			phoneNo:'',
			cityState:'',
			country:'',
		},
		onSubmit:values=>{
			props.contract.methods.addProducer(values.name,values.phoneNo,values.cityState,values.country).send({from:props.accounts[0]})
			.then(success=>console.log(success))
			.catch(err=>console.log(err));
			
		},	


	});
	return(
		<form onSubmit={formik.handleSubmit}>
		<label htmlFor="name">name</label>
	       <input
	         id="name"
	         name="name"
	         type="text"
	         onChange={formik.handleChange}
	         value={formik.values.name}
	       />
	       <label htmlFor="phoneNo">phoneNo</label>
	       <input
	         id="phoneNo"
	         name="phoneNo"
	         type="text"
	         onChange={formik.handleChange}
	         value={formik.values.phoneNo}
	       />
	       <label htmlFor="cityState">cityState</label>
	       <input
	         id="cityState"
	         name="cityState"
	         type="cityState"
	         onChange={formik.handleChange}
	         value={formik.values.cityState}
	       />
	       <label htmlFor="country">country</label>
	       <input
	         id="country"
	         name="country"
	         type="country"
	         onChange={formik.handleChange}
	         value={formik.values.country}
	       />
	       <button type="submit">Submit</button>
		</form>
		)
}

export default RegisterProducer