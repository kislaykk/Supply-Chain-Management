import React, { useState, useEffect } from "react";

const GetContractParamters = (props) => {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [leadTime, setLeadTime] = useState(0);
  const [payment, setPayment] = useState(0);

  useEffect(() => {
   (async () => {
      const res = await props.contract.methods.getContractParameters().call();
      setLatitude(res['0'][0]);
      setLongitude(res['0'][1]);
      setLeadTime(res['1']);
      setPayment(res['2']);
    }) () ;
  }, []);

  return (
    <div>
      latitude:{latitude}
      
      longitude:{longitude}
      
      leadTime:{leadTime}
     
      payment:{payment}
    </div>
    );
};

export default GetContractParamters;