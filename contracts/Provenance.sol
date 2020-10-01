//SPDX-License-Identifier:UNLICENSED
pragma solidity ^0.7.1;



contract Provenance
{
    address admin;
    struct Producer
    {
        string name;
        uint phoneNo;
        string cityState;
        string country;
        bool certified;
    }
    struct Product
    {
        address producer;
        string name;
        int[] locationData;
        uint timeStamp;
    }
    mapping (address => Producer) producers;
    mapping (string => Product) products;

    constructor()//only run once when the contact is deployed
    {
        admin=msg.sender;
    }

    modifier onlyAdmin()
    {
        require(msg.sender==admin, "You are not authorized to perform this action");
        _;
    }

    modifier onlyProducer(string memory _serialNo) 
    { 
        require (msg.sender==products[_serialNo].producer,"You can't delete this product:You are not the producer"); 
        _; 
    }
    

    function addProducer(string memory _name,uint _phoneNo,string memory _cityState,string memory  _country) public returns (bool)
    {
        if(bytes(producers[msg.sender].name).length==0 && bytes(_name).length!=0)
        {
            producers[msg.sender].name=_name;
            producers[msg.sender].phoneNo=_phoneNo;
            producers[msg.sender].cityState=_cityState;
            producers[msg.sender].country=_country;
            producers[msg.sender].certified=false;
            return true;
        }
        else
        {
            return false;
        }
    }

    function removeProducer(address _producer) onlyAdmin public returns(bool)
    {
        delete producers[_producer];
        return true;
    }

    function findProducer(address _producer)public  view returns(string memory,uint,string memory,string memory,bool)
    {
        return(producers[_producer].name,producers[_producer].phoneNo,producers[_producer].cityState,producers[_producer].country,producers[_producer].certified);
    }

    function certifyProducer(address _producer) onlyAdmin public returns (bool)
    {
        producers[_producer].certified=true;
        return true;
    }

    function addProduct(string memory _serialNo,string memory _name,int[] memory _locationData)public  returns (bool)
    {
        if(products[_serialNo].producer==address(0x0) && bytes(_serialNo).length!=0)
        {
            products[_serialNo].producer=msg.sender;
            products[_serialNo].name=_name;
            products[_serialNo].locationData=_locationData;
            products[_serialNo].timeStamp=block.timestamp;
            return (true);
        }
        else
        {
            return (false);
        }
    }
    function showOwner() public view returns(address)
    {
        return admin;
    }

    function removeProduct(string memory _serialNo) onlyProducer(_serialNo) public returns(bool)


    {
        delete products[_serialNo];
        return true;
    }
    function findProduct(string memory _serialNo) public view returns(address,string memory,int[] memory,uint)
    {
        return(products[_serialNo].producer,products[_serialNo].name,products[_serialNo].locationData,products[_serialNo].timeStamp);
    }
}
