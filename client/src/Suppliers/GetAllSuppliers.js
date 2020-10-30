import React, { useState, useEffect } from "react";

const GetAllSuppliers = (props) => {
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
   (async () => {
      const res = await props.contract.methods.allSuppliers().call();
      let res2=[];
      for (let add of res)
      {
      	if (add!=="0x0000000000000000000000000000000000000000")
      		res2.push(add);
      }
      setSuppliers(res2);
    }) () ;
  }, []);
  const listItems=suppliers.map((supplier)=><li key={supplier}>{supplier}</li>);
  return <ul>{listItems}</ul>;
};

export default GetAllSuppliers;