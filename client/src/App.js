import React, { Component } from "react";
import Provenance from "./contracts/Provenance.json";
import Tracking from "./contracts/Tracking.json";
import getWeb3 from "./getWeb3";
import RegisterProducer from "./Producers/RegisterProducer";
import FindProducer from "./Producers/FindProducer";
import CertifyProducer from "./Producers/CertifyProducer";
import RemoveProducer from "./Producers/RemoveProducer"
import AddProducts from "./Products/AddProducts";
import FindProduct from "./Products/FindProduct";
import RemoveProduct from "./Products/RemoveProduct";
import BalanceOfContract from "./TrackingController/BalanceOfContract";
import SendEthToContract from "./TrackingController/SendEthToContract";
import SetContractParameters from "./TrackingController/SetContractParameters";
import GetContractParameters from "./Suppliers/GetContractParameters";
import AddSupplier from "./Suppliers/AddSupplier";
import FindSupplier from "./Suppliers/FindSupplier";
import SendShipment from "./Suppliers/SendShipment";
import CheckShipment from "./Suppliers/CheckShipment";
import ReceiveShipment from "./TrackingController/ReceiveShipment";
import CalculateReputation from "./Suppliers/CalculateReputation"
import CheckSuccess from "./Suppliers/CheckSuccess"
import DeleteSupplier from "./Suppliers/DeleteSupplier"
import DeleteShipment from "./Suppliers/DeleteShipment"
import GetAllSuppliers from "./Suppliers/GetAllSuppliers"


class App extends Component {
  state = { accounts:null,web3: null, contract1: null,contract2:null };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();


      // Use web3 to get the user's accounts.
      const accounts=await web3.eth.getAccounts()
      
      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
    
      const deployedNetwork1 = Provenance.networks[networkId];
      const deployedNetwork2 = Tracking.networks[networkId];
      
      const instance1 = new web3.eth.Contract(
        Provenance.abi,
        deployedNetwork1 && deployedNetwork1.address,

      );

      const instance2 = new web3.eth.Contract(
        Tracking.abi,
        deployedNetwork2 && deployedNetwork2.address,

      );

      console.log(instance1,instance2)
;
      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ accounts:accounts ,web3:web3 ,contract1:instance1 ,contract2: instance2 });
      
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }

    return (
      <div>
      <div>
        <h1>FOR Provenance</h1>
        <br/>
         <RegisterProducer contract={this.state.contract1} accounts={this.state.accounts}/>
        <br/>
        <FindProducer contract={this.state.contract1} />
        <br/>
        <CertifyProducer contract={this.state.contract1} accounts={this.state.accounts}/>
        <br/>
        <RemoveProducer contract={this.state.contract1} accounts={this.state.accounts}/>
        <br/>
        <AddProducts contract={this.state.contract1} accounts={this.state.accounts}/>
        <br/>
        <FindProduct contract={this.state.contract1} />
        <br/>
        <RemoveProduct contract={this.state.contract1} accounts={this.state.accounts}/>
      </div>
      <h1>FOR TRACKING</h1><br/>
      <div >
       <BalanceOfContract contract={this.state.contract2}/>
       <br/>
       <SendEthToContract contract={this.state.contract2} accounts={this.state.accounts} web3={this.state.web3}/>
       <br/>
       <SetContractParameters contract={this.state.contract2} accounts={this.state.accounts}/>
       <br/>
       <GetContractParameters contract={this.state.contract2}/>
       <br/>
       <AddSupplier contract={this.state.contract2} accounts={this.state.accounts}/>
       <br/>
       <FindSupplier contract={this.state.contract2} />
       <br/>
       <SendShipment contract={this.state.contract2} accounts={this.state.accounts} />
       <br/>
       <CheckShipment contract={this.state.contract2} />
       <br/>
       <ReceiveShipment contract={this.state.contract2} accounts={this.state.accounts} />
       <br/>
       <CalculateReputation contract={this.state.contract2}/>
       <br/>
        <CheckSuccess contract={this.state.contract2}/>
        <br/>
        <DeleteSupplier contract={this.state.contract2} accounts={this.state.accounts} />
        <br/>
        <DeleteShipment contract={this.state.contract2} accounts={this.state.accounts} />
        <GetAllSuppliers contract={this.state.contract2}/>
        </div>
      </div>
    );
  }
}

export default App;
