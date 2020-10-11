import React from'react';
import {useFormik} from 'formik';

const FindSupplier=(props)=>{
  const formik=useFormik({
    initialValues:{
      supplier_address:'',
    },
    onSubmit:async (values)=>{
      try{
        let vals=await props.contract.methods.findSupplier(values.supplier_address).call()
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
    <label htmlFor="supplier_address">supplier's Address</label>
         <input
           id="supplier_address"
           name="supplier_address"
           type="text"
           onChange={formik.handleChange}
           value={formik.values.supplier_address}
         />
         <button type="submit">Submit</button>
    </form>
    )
}

export default FindSupplier