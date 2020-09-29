const fs=require('fs');
const solc=require('solc');
const Web3=require('web3');

const content=fs.readFileSync('./contracts/Provenance.sol','utf-8');

const input={
    language:'Solidity',
    sources:{
        'Provenance.sol':{
            content,
        }
    },
    settings:{
        outputSelection:{
            '*':{
                '*':['*']
            }
        }
    }
};

const output=JSON.parse(solc.compile(JSON.stringify(input)));
const provider=new Web3.providers.HttpProvider("http://localhost:8545");
const web3=new Web3(provider);

const {Provenance}=output.contracts["Provenance.sol"];
const {abi,evm}=Provenance;

const contract = new web3.eth.Contract(abi);


const deployAndRunContract = async () => {
    // Get the addresses of Ganache's fake wallet:
    const addresses = await web3.eth.getAccounts();
    
    // Get the current price of gas
    const gasPrice = await web3.eth.getGasPrice();
  
    // Deploy the HelloWorld contract (its bytecode) 
    // by spending some gas from our first address
    contract.deploy({
      data: evm.bytecode.object,
    })
    .send({
      from: addresses[0],
      gas: 3000000,
      gasPrice,
    })
    .on('confirmation', async (confNumber, receipt) => {
      const { contractAddress } = receipt
      console.log("Deployed at", contractAddress);
  
      // Get the deployed contract instance:
      const contractInstance = new web3.eth.Contract(abi, contractAddress)
  
      // Call the "getMyName" function and log the result:
      const myName = await contractInstance.methods.showOwner().call();
      console.log("Result from blockchain:", myName);
    })
    .on('error', (err) => {
      console.log("Failed to deploy:", err) 
    })
  }
  
  deployAndRunContract(); // Call the function