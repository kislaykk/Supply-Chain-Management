
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
		}
		finally
		{
			await instance.removeProducer(accounts[3],{from:accounts[0]});
			let producerObj=await instance.findProducer(accounts[3]);
			assert.equal(producerObj['0'],'');
		}
	})
});