
const Provenance=artifacts.require("Provenance");
const Chance=require('chance');
let chance=new Chance();

contract("To add Producers and give them certifications,and their removal",async accounts=>{
	
	it("Adding a producer returns true, and also the msg.sender is the producer address",async ()=>{
		let instance=await Provenance.deployed();
		let producerName=chance.name({nationality:'en'});
		let producerPhoneNo=parseInt(chance.phone({formatted:false}));
		let producerCityState=chance.city()+'-'+chance.state({ full: true });
		let producerCountry=chance.country({ full: true });
		let addProducerSuccess=await instance.addProducer(producerName,producerPhoneNo,producerCityState,producerCountry,{from:accounts[1]});
		let producerObj=await instance.findProducer(accounts[1]);
		
		assert.equal(producerObj['0'],producerName);
		assert.equal(producerObj['1'].toNumber(),producerPhoneNo);
		assert.equal(producerObj['2'],producerCityState);
		assert.equal(producerObj['3'],producerCountry);
		assert.equal(producerObj['4'],false);//as the producer is not certified yet
		

	})
	it("Adding a producer and then certifying the producer should be successful",async()=>{
		let instance=await Provenance.deployed();
		let producerName=chance.name({nationality:'en'});
		let producerPhoneNo=parseInt(chance.phone({formatted:false}));
		let producerCityState=chance.city()+'-'+chance.state({ full: true });
		let producerCountry=chance.country({ full: true });
		let addProducerSuccess=await instance.addProducer(producerName,producerPhoneNo,producerCityState,producerCountry,{from:accounts[2]});
		let producerObj=await instance.findProducer(accounts[2]);
		
		assert.equal(producerObj['0'],producerName);
		assert.equal(producerObj['1'].toNumber(),producerPhoneNo);
		assert.equal(producerObj['2'],producerCityState);
		assert.equal(producerObj['3'],producerCountry);
		assert.equal(producerObj['4'],false);//as the producer is not certified yet

		try{
			await instance.certifyProducer(accounts[2],{from:accounts[2]})//GUARENTEE: fails as only owner can certify a producer
		}catch(error)
		{
			//skip

		}
		finally
		{
		let certifyProducer=await instance.certifyProducer(accounts[2],{from:accounts[0]});
		
		producerObj=await instance.findProducer(accounts[2]);
		assert.equal(producerObj['4'],true);//Now the producer is certified
		}
		
	});
	it("Adding a producer and removing him by Owner only",async()=>{
		let instance=await Provenance.deployed();
		let producerName=chance.name({nationality:'en'});
		let producerPhoneNo=parseInt(chance.phone({formatted:false}));
		let producerCityState=chance.city()+'-'+chance.state({ full: true });
		let producerCountry=chance.country({ full: true });
		let addProducerSuccess=await instance.addProducer(producerName,producerPhoneNo,producerCityState,producerCountry,{from:accounts[3]});

		let producerObj=await instance.findProducer(accounts[3]);

		
		assert.equal(producerObj['0'],producerName);
		assert.equal(producerObj['1'].toNumber(),producerPhoneNo);
		assert.equal(producerObj['2'],producerCityState);
		assert.equal(producerObj['3'],producerCountry);
		try
		{
			await instance.removeProducer(accounts[3],{from:accounts[3]});
		}
		catch(error)
		{
			//skip

			// console.log(error);

		}
		finally
		{
			await instance.removeProducer(accounts[3],{from:accounts[0]});
			let producerObj=await instance.findProducer(accounts[3]);
			assert.equal(producerObj['0'],'');
		}
	})

});

contract("To add product name and details and removal of the product only by the producer of the product", async accounts=>{
	it("should add product by a serial number and finding it based on that serial number",async ()=>{
		let instance= await Provenance.deployed();
		let productName=chance.word();
		let serialNo="pro-1";
		let location=[Math.round(chance.latitude()),Math.round(chance.longitude())];
		
		let addedProduct=await instance.addProduct(serialNo,productName,location,{from:accounts[1]});
		let findProduct=await instance.findProduct.call(serialNo);
		
		assert.equal(findProduct['0'],accounts[1]);
		assert.equal(findProduct['1'],productName);
		
		expect(parseInt(findProduct['2'][0].toString())).be.equal(location[0]);
		expect(parseInt(findProduct['2'][1].toString())).be.equal(location[1]);
		expect(web3.utils.isBN(findProduct['3'])).to.be.equal(true);
		
	});
	it("should delete the the added product only by the producer",async ()=>{
		let instance= await Provenance.deployed();
		let productName=chance.word();
		let serialNo="pro-2";
		let location=[Math.round(chance.latitude()),Math.round(chance.longitude())];
		
		let addedProduct=await instance.addProduct(serialNo,productName,location,{from:accounts[2]});

		let deleteProduct=await instance.removeProduct(serialNo,{from:accounts[2]});

		let findProduct=await instance.findProduct.call(serialNo);

		expect(findProduct['1']).to.be.equal('');//removal of data.

	});

})


