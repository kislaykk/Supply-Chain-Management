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