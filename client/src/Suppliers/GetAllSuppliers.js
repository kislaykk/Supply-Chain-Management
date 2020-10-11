import React, { useState, useEffect } from "react";

const GetAllSuppliers = (props) => {
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
   (async () => {
      const res = await props.contract.methods.allSuppliers().call();
      console.log(res)
      setSuppliers(res);
    }) () ;
  }, []);

  return <div>{suppliers}</div>;
};

export default GetAllSuppliers;