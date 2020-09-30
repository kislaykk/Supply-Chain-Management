let Chance=require('chance');
let chance=new Chance();
const tracking=artifacts.require('Tracking');

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

	})
})