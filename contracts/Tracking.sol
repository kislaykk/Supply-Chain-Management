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
        address payable sender;
        bool paid;
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
    
    //payment
    function sendPayment(address payable receiver,uint amount) onlyAdmin internal returns(bool)
    {
        if(address(this).balance<=amount)
        {
            receiver.transfer(amount);
            return true;
        }
        else
        {
            return false;
        }
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

        if( keccak256(bytes( shipments[trackingNo].item))==keccak256(bytes(_item)) && shipments[trackingNo].quantity==_quantity && !(shipments[trackingNo].paid))
        {
            successShipped[shipments[trackingNo].sender]+=1;
            emit Success('Item received',trackingNo,_locationData,block.timestamp,msg.sender);
            if (block.timestamp<=shipments[trackingNo].timeStamp+contractLeadTime && _locationData[0]==contractLocation[0] && _locationData[1]==contractLocation[1])
            {
                if(sendPayment(shipments[trackingNo].sender,contractPayment))
                {
                    emit Payment("Payment successful",admin,shipments[trackingNo].sender,contractPayment);
                    shipments[trackingNo].paid=true;
                }
            }
            else
            {
                emit Failure("Criteria not met hence transaction failed");
            }
        }
        else
        {
            emit Failure('Error in item/quantity');
        }
    }

    function deleteShipment(string memory trackingNo) onlyAdmin public returns(bool)
    {
        delete shipments[trackingNo];
        return true;
    }

    function checkShipment(string memory trackingNo) public view returns(string memory,uint,uint[] memory,uint,address)
    {
        return(shipments[trackingNo].item,shipments[trackingNo].quantity,shipments[trackingNo].locationData,shipments[trackingNo].timeStamp,shipments[trackingNo].sender);
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

    fallback() onlyAdmin external {}

    function balanceOfContract()onlyAdmin external view returns (uint)
    {
        return (address(this).balance);
    }
}