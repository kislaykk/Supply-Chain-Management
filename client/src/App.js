import React, { Component } from "react";
import Provenance from "./contracts/Provenance.json";
import getWeb3 from "./getWeb3";
import RegisterProducer from "./Producers/RegisterProducer";
import FindProducer from "./Producers/FindProducer";
import CertifyProducer from "./Producers/CertifyProducer";
import RemoveProducer from "./Producers/RemoveProducer"
import AddProducts from "./Products/AddProducts";
import FindProduct from "./Products/FindProduct";
import RemoveProduct from "./Products/RemoveProduct";

class App extends Component {
  state = { storageValue: 0, accounts:null,web3: null, contract: null };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();


      // Use web3 to get the user's accounts.
      const accounts=await web3.eth.getAccounts()
      
      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = Provenance.networks[networkId];
      
      const instance = new web3.eth.Contract(
        Provenance.abi,
        deployedNetwork && deployedNetwork.address,

      );




      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, contract: instance ,accounts:accounts});
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
      <div >
        <RegisterProducer contract={this.state.contract} accounts={this.state.accounts}/>
        <br/>
        <FindProducer contract={this.state.contract} />
        <br/>
        <CertifyProducer contract={this.state.contract} accounts={this.state.accounts}/>
        <br/>
        <RemoveProducer contract={this.state.contract} accounts={this.state.accounts}/>
        <br/>
        <AddProducts contract={this.state.contract} accounts={this.state.accounts}/>
        <br/>
        <FindProduct contract={this.state.contract} />
        <br/>
        <RemoveProduct contract={this.state.contract} accounts={this.state.accounts}/>
      </div>
    );
  }
}

export default App;
