import React, { useState, useEffect } from "react";

const BalanceOfContract = (props) => {
  const [balance, setBalance] = useState(0);

  useEffect(() => {
   (async () => {
      const res = await props.contract.methods.balanceOfContract().call();
      setBalance(res);
    }) () ;
  }, []);

  return <div>
  	{balance} wei
  	<br/>
  	{balance/(10**17)} eth
  	</div>;
};

export default BalanceOfContract;