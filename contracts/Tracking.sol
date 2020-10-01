//SPDX-License-Identifier:UNLICENSED
pragma solidity ^0.7.1;
contract Tracking
{
    address admin;
    int [] contractLocation;//for latitude and longitude
    uint contractLeadTime;//in seconds
    uint contractPayment;//in tokens
    struct Shipment
    {
        string item;
        uint quantity;
        int[] locationData;
        uint timeStamp;
        address payable sender;
        bool paid;
    }
    mapping(string=>Shipment)shipments;
    mapping(address=>uint) balences;
    mapping(address=>uint) totalShipped;
    mapping(address=>uint) successShipped;

    //Supplier  
    struct Supplier
    {
        string name;
        uint phoneNo;
        string cityState;
        string country;
        uint reputation;
    }
    mapping(address=>Supplier) suppliers;
    address[] suppliersByAddress;
    //events to display messages
    event Success(string _message,string trackingNo,int[] _locationData,uint _timeStamp,address _sender);
    event Payment(string _message,address _from,address _to,uint _amount);
    event Failure(string _message);

    constructor()
    {
        admin=msg.sender;
        
    }

    modifier onlyAdmin()
    {
        require(msg.sender==admin, "You are not authorized for this action");
        _;
    }


    function addSupplier(string memory _name,uint _phoneNo,string memory _cityState,string memory _country) public returns(bool)
    {
        if(bytes(suppliers[msg.sender].name).length==0 && bytes(_name).length!=0)
        {
            suppliers[msg.sender].name=_name;
            suppliers[msg.sender].phoneNo=_phoneNo;
            suppliers[msg.sender].cityState=_cityState;
            suppliers[msg.sender].country=_country;
            suppliers[msg.sender].reputation=calculateReputation(msg.sender);
            suppliersByAddress.push(msg.sender);
            return true;
        }
        else
        {
            return true;
        }
    }

    function deleteSupplier(address _supplier) onlyAdmin public returns(bool)
    {
        delete suppliers[_supplier];
        for (uint i = 0; i < suppliersByAddress.length; i++) 
        {
            if (suppliersByAddress[i] == _supplier) 
            {
            for (uint index = i; index < suppliersByAddress.length- 1; index++) 
            {
            suppliersByAddress[index] =
            suppliersByAddress[index + 1];
            }
            delete suppliersByAddress[suppliersByAddress.length-1];
            
        }
        }
        return true;
    }

    function findSupplier(address _supplier)public  view returns (string memory,uint,string memory,string memory,uint)
    {
        return(suppliers[_supplier].name,suppliers[_supplier].phoneNo,suppliers[_supplier].cityState,suppliers[_supplier].country,suppliers[_supplier].reputation);
    }

    function allSuppliers() public view returns (address[] memory) 
    {
        return suppliersByAddress;
    }
    //payment
    function sendPayment(address payable receiver,uint amount) onlyAdmin internal returns(bool)
    {
        if(address(this).balance>=amount)
        {
            receiver.transfer(amount);
            return true;
        }
        else
        {
            return false;
        }
    }

    function setContractParameters(int[] memory _location,uint _leadTime,uint _payment)onlyAdmin public returns (bool)
    {
        contractLocation=_location;
        contractLeadTime=_leadTime;
        contractPayment=_payment;
        return true;
    }
    function getContractParameters() public view returns(int[] memory,uint ,uint )
    {
        return (contractLocation,contractLeadTime,contractPayment);
    }
    function sendShipment(string memory trackingNo,string memory _item,uint _quantity,int[] memory _locationData) public returns (bool)
    {
        shipments[trackingNo].item=_item;
        shipments[trackingNo].quantity=_quantity;
        shipments[trackingNo].locationData=_locationData;
        shipments[trackingNo].timeStamp=block.timestamp;
        shipments[trackingNo].sender=msg.sender;
        totalShipped[msg.sender]+=1;
        emit Success('Item Shipped',trackingNo,_locationData,shipments[trackingNo].timeStamp,msg.sender);
        return true;
    }

    function receiveShipment(string memory trackingNo,string memory _item,uint _quantity,int[] memory _locationData)public  returns (bool)
    {
        // improve the logic
        //more if and else for different cases......

        if( keccak256(bytes( shipments[trackingNo].item))==keccak256(bytes(_item)) && shipments[trackingNo].quantity==_quantity && !(shipments[trackingNo].paid))
        {
            successShipped[shipments[trackingNo].sender]+=1;
            emit Success('Item received',trackingNo,_locationData,block.timestamp,msg.sender);
            if (block.timestamp<=shipments[trackingNo].timeStamp+contractLeadTime && _locationData[0]==contractLocation[0] && _locationData[1]==contractLocation[1])
            {
                if(sendPayment(shipments[trackingNo].sender,contractPayment))
                {
                    shipments[trackingNo].paid=true;
                    emit Payment("Payment successful",admin,shipments[trackingNo].sender,contractPayment);
                    return true;
                    
                }
                else
                {
                    emit Payment("Payment failed",admin,shipments[trackingNo].sender,contractPayment);
                    return false;
                }
            }
            
            else
            {
                emit Failure("Criteria not met hence transaction failed");
                return false;
            }
        }
        else
        {
            emit Failure('Error in item/quantity');
            return false;
        }
    }

    function deleteShipment(string memory trackingNo) onlyAdmin public returns(bool)
    {
        delete shipments[trackingNo];
        return true;
    }

    function checkShipment(string memory trackingNo) public view returns(string memory,uint,int[] memory,uint,bool,address)
    {
        return(shipments[trackingNo].item,shipments[trackingNo].quantity,shipments[trackingNo].locationData,shipments[trackingNo].timeStamp,shipments[trackingNo].paid,shipments[trackingNo].sender);
    }

    function checkSuccess(address _sender) public view returns(uint,uint)
    {
        return (successShipped[_sender],totalShipped[_sender]);
    }

    function calculateReputation(address _sender) public view returns(uint)
    {
        if(totalShipped[_sender]!=0)
        {
            return(100*successShipped[_sender]/totalShipped[_sender]);
        }
        else
        {
            return 0;
        }
    }
    function showAdmin() public view returns (address)
    {
        return admin;
    }

    receive() onlyAdmin external payable{}

    function balanceOfContract()onlyAdmin public view returns (uint)
    {
        return (address(this).balance);
    }
}
