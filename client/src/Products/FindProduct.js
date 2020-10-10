import React from'react';
import {useFormik} from 'formik';

const FindProduct=(props)=>{
  const formik=useFormik({
    initialValues:{
      serialNo:'',
    },
    onSubmit:async (values)=>{
      try{
        let vals=await props.contract.methods.findProduct(values.serialNo).call()
        if(vals['1']==='')
        {
          alert("no one with this serialNo");
        }
        else
        console.log(vals);

      }
      catch(err){
        alert("no one with this serialNo");
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
         <button type="submit">Find</button>
    </form>
    )
}

export default FindProduct