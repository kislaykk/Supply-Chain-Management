//SPDX-License-Identifier:UNLICENSED
pragma solidity^0.7.0;
contract Tracking
{
    address admin;
    uint [] contractLocation;//for latitude and longitude
    uint contractLeadTime;//in seconds
    uint contractPayment;//in tokens
    struct Shipment
    {
        string item;
        uint quantity;
        uint[] locationData;
        uint timeStamp;
        address sender;
    }
    mapping(string=>Shipment)shipments;
    mapping(address=>uint) balences;
    mapping(address=>uint) totalShipped;
    mapping(address=>uint) successShipped;

    //events to display messages
    event Success(string _message,string trackingNo,uint[] _locationData,uint _timeStamp,address _sender);
    event Payment(string _message,address _from,address _to,uint _amount);
    event Failure(string _message);

    constructor()
    {
        admin=msg.sender;
        
    }

    modifier onlyAdmin()
    {
        require(msg.sender!=admin, "You are not authorized for this action");
        _;
    }
    
    function setContractParameters(uint[] memory _location,uint _leadTime,uint _payment)onlyAdmin public returns (bool)
    {
        contractLocation=_location;
        contractLeadTime=_leadTime;
        contractPayment=_payment;
        return true;
    }

    function sendShipment(string memory trackingNo,string memory _item,uint _quantity,uint[] memory _locationData) public returns (bool)
    {
        shipments[trackingNo].item=_item;
        shipments[trackingNo].quantity=_quantity;
        shipments[trackingNo].locationData=_locationData;
        shipments[trackingNo].timeStamp=block.timestamp;
        shipments[trackingNo].sender=msg.sender;
        totalShipped[msg.sender]+=1;
        emit Success('Item Shipped',trackingNo,_locationData,shipments[trackingNo].timeStamp,msg.sender);
    }

    function receiveShipment(string memory trackingNo,string memory _item,uint _quantity,uint[] memory _locationData)public  returns (bool)
    {
        // improve the logic
        //more if and else for different cases......

        if( keccak256(bytes( shipments[trackingNo].item))==keccak256(bytes(_item)) && shipments[trackingNo].quantity==_quantity)
        {
            successShipped[shipments[trackingNo].sender]+=1;
            emit Success('Item received',trackingNo,_locationData,block.timestamp,msg.sender);
            if (block.timestamp<=shipments[trackingNo].timeStamp+contractLeadTime && _locationData[0]==contractLocation[0] && _locationData[1]==contractLocation[1])
            {
                //payment???????
            }
            else
            {
                emit Failure("Criteria not met hence transaction failed");
            }
        }
        else
        {
            Failure('Error in item /Quantity');
        }
    }

    function deleteShipment(string memory trackingNo) onlyAdmin public returns(bool)
    {
        delete shipments[trackingNo];
        return true;
    }
}