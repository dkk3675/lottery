pragma solidity ^0.4.17;

contract Lottery {
    address public manager;
    address[] public players;
    address public winner;
    
    function Lottery() public {
        manager = msg.sender;
    }
    
    function enter() public payable {
        require(msg.value > .01 ether);
        bool flag = true; 
        for(uint i=0;i<players.length;i++){
            if(msg.sender == players[i]){
                flag = false;
                break;
            }
        }
        if(flag){
            players.push(msg.sender);
        }
    }
    
    function random() private view returns (uint) {
        return uint(keccak256(block.difficulty, now, players));
    }
    
    function pickWinner() public payable restricted {
        uint index = random() % players.length;
        players[index].transfer(this.balance);
        winner = players[index];
        players = new address[](0);
    }
    
    modifier restricted() {
        require(msg.sender == manager);
        _;
    }
    function getPlayers() public view returns (address[]) {
        return players;
    }
}   