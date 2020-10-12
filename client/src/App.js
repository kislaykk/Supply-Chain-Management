import React, { Component } from "react";
import Provenance from "./contracts/Provenance.json";
import Tracking from "./contracts/Tracking.json";
import getWeb3 from "./getWeb3";
import Producers from "./Producers/Producers";
import Products from "./Products/Products";
import Suppliers from "./Suppliers/Suppliers";
import Contract from "./TrackingController/Contract";
import Home from "./Home";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch
} from "react-router-dom";


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
      <Router>
        <div>
          
          <Link to="/">Home</Link>
          <Link to="/Producers">Producers</Link>
          <Link to="/Products">Products</Link>
          <Link to="/Suppliers">Suppliers</Link>
          <Link to="/Contract">Contract</Link>
          <Switch>
            <Route exact path="/">
              <Home/>
            </Route>
            <Route path="/Producers">
              <Producers contract={this.state.contract1} accounts={this.state.accounts}/>
            </Route>
            <Route path="/Products">
              <Products contract={this.state.contract1} accounts={this.state.accounts}/>
            </Route>
            <Route path="/Suppliers" >
              <Suppliers contract={this.state.contract2} accounts={this.state.accounts} />
            </Route>
            <Route path="/Contract">
              <Contract contract={this.state.contract2} accounts={this.state.accounts} web3={this.state.web3}/>
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}


export default App;
