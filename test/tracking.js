const tracking=artifacts.require('Tracking');

let Chance=require('chance');
let chance=new Chance();

contract("adding supplier,finding it and removing it",async accounts=>{
	it("this should add the supplier and find also search the supplier by the account address",async ()=>{
		let instance=await tracking.deployed();
		let supplierName=chance.name({nationality:'en'});
		let supplierPhoneNo=parseInt(chance.phone({formatted:false}));
		let supplierCityState=chance.city()+'-'+chance.state({ full: true });
		let supplierCountry=chance.country({ full: true });

		let addSupplier=await instance.addSupplier(supplierName,supplierPhoneNo,supplierCityState,supplierCountry,{from : accounts[1]});
		let supplier=await instance.findSupplier(accounts[1]);
		expect(supplier['0']).to.be.equal(supplierName);
	});
	it("this should delete the supplier,only by the the owner",async ()=>{
		let instance=await tracking.deployed();
		let deletedSupplier=await instance.deleteSupplier(accounts[1],{from:accounts[0]});
		supplier=await instance.findSupplier(accounts[1]);
		expect(supplier['0']).to.be.equal('');
	});
	it("this should give us the list of the suppliers(we are adding 3 suppliers here:account 2,3,4)",async ()=>{
		let instance=await tracking.deployed();
		//adding supplier 1
		let supplierName1=chance.name({nationality:'en'});
		let supplierPhoneNo1=parseInt(chance.phone({formatted:false}));
		let supplierCityState1=chance.city()+'-'+chance.state({ full: true });
		let supplierCountry1=chance.country({ full: true });

		let addSupplier1=await instance.addSupplier(supplierName1,supplierPhoneNo1,supplierCityState1,supplierCountry1,{from : accounts[2]});

		//adding supplier 2
		let supplierName2=chance.name({nationality:'en'});
		let supplierPhoneNo2=parseInt(chance.phone({formatted:false}));
		let supplierCityState2=chance.city()+'-'+chance.state({ full: true });
		let supplierCountry2=chance.country({ full: true });

		let addSupplier2=await instance.addSupplier(supplierName2,supplierPhoneNo2,supplierCityState2,supplierCountry2,{from : accounts[3]});

		//adding supplier 3
		let supplierName3=chance.name({nationality:'en'});
		let supplierPhoneNo3=parseInt(chance.phone({formatted:false}));
		let supplierCityState3=chance.city()+'-'+chance.state({ full: true });
		let supplierCountry3=chance.country({ full: true });

		let addSupplier3=await instance.addSupplier(supplierName3,supplierPhoneNo3,supplierCityState3,supplierCountry3,{from : accounts[4]});

		//
		let suppliersList=await instance.allSuppliers();
		
		assert.isArray(suppliersList);
		expect(suppliersList).to.include(accounts[2]);
		expect(suppliersList).to.include(accounts[3]);
		expect(suppliersList).to.include(accounts[4]);

	});
});

contract("to add contract parameters,send shipment,receive shipment and transacting money from contract", async accounts=>{
	let location;
	it("sending ethers to the deployed smart contracts and checking it",async()=>{
		let instance=await tracking.deployed();
		let balanceBeforeSending=await web3.eth.getBalance(accounts[0]);
		let weiToTransfer= web3.utils.toWei('2','ether');
		let successfulEtherTransfer=await instance.send(weiToTransfer,{from:accounts[0]});
		let balanceOfSmartContract=await instance.balanceOfContract();
		let balanceAfterSending=await web3.eth.getBalance(accounts[0]);
		let difference=parseInt(balanceBeforeSending)-parseInt(balanceAfterSending);
		expect(difference).to.be.above(parseInt(weiToTransfer));
		expect(difference).to.be.below(parseInt(web3.utils.toWei('3','ether')));
		expect(balanceOfSmartContract.toString()).to.be.equal(weiToTransfer);
	});

	it("setting contract prameters",async()=>{
		let instance=await tracking.deployed();
		location=[Math.round(chance.latitude()),Math.round(chance.longitude())];
		let leadTime=120; //120 seconds
		let paymentAmount=web3.utils.toWei('1','ether');
		let succesfullSetContractPayment=await instance.setContractParameters(location,leadTime,paymentAmount,{from:accounts[0]});
		let contractParameters=await instance.getContractParameters();
		// console.log(contractParameters);
		expect(parseInt(contractParameters['0'][0].toString())).to.be.equal(location[0]);
		expect(parseInt(contractParameters['0'][1].toString())).to.be.equal(location[1]);
		expect(parseInt(contractParameters['1'].toString())).to.be.equal(120);
		expect(contractParameters['2'].toString()).to.be.equal(web3.utils.toWei('1','ether'));
	});
	it("creating a supplier who supplies fruits from a location to contract parameter's location and gets paid",async()=>{
		//Adding a supplier
		let instance=await tracking.deployed();
		// let instance=await tracking.deployed();
		let supplierName=chance.name({nationality:'en'});
		let supplierPhoneNo=parseInt(chance.phone({formatted:false}));
		let supplierCityState=chance.city()+'-'+chance.state({ full: true });
		let supplierCountry=chance.country({ full: true });

		let addSupplier=await instance.addSupplier(supplierName,supplierPhoneNo,supplierCityState,supplierCountry,{from : accounts[1]});

		//that supplier is now sending shipments of apple.
		let sendShipment=await instance.sendShipment('ship-1','apple',30,[3,5],{from:accounts[1]});

		//receiving shipment by the owner of the contract
		let receiveShipment= await instance.receiveShipment('ship-1','apple',30,location,{from:accounts[0]});

		//checking shipment
		let checkedShipment=await instance.checkShipment('ship-1');
		expect(sendShipment.logs[0].event).to.be.equal('Success');
		expect(sendShipment.logs[0].args['0']).to.be.equal('Item Shipped');
		expect(receiveShipment.logs[0].event).to.be.equal('Success');
		expect(receiveShipment.logs[0].args['0']).to.be.equal('Item received');
		expect(receiveShipment.logs[1].event).to.be.equal('Payment');
		expect(receiveShipment.logs[1].args['0']).to.be.equal('Payment successful');
		expect(checkedShipment['4']).to.be.true;


	});
});