import "./App.css";
import React from "react";
import web3 from './web3';
import lottery from './lottery';

class App extends React.Component {
  
  state = { manager: '', players: [], balance: '', value: '', message: '--', previousWinner: '--', button: true };

  async componentDidMount(){
    const manager = await lottery.methods.manager().call();
    const players = await lottery.methods.getPlayers().call();
    const balance = await web3.eth.getBalance(lottery.options.address);

    this.setState({ manager: manager, players: players, balance: balance });
  };

  onSubmit = async (event) => {
    event.preventDefault();
    if(this.state.value <= 0.01){
      alert(`Ether of value greater than 0.01 ether is required to enter`)
      return;
    }
    this.setState({ button: false });
    const accounts = await web3.eth.getAccounts();
    this.setState({ message: "Wait for transaction to complete..." });
    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei(this.state.value,'ether')
    }).then(async details => {
      this.setState({ message: `Transaction completed with Transaction ID - ${details.transactionHash}.` });
      const players = await lottery.methods.getPlayers().call();
      const balance = await web3.eth.getBalance(lottery.options.address);
      this.setState({ players: players,balance: balance,value: '' });
    }).catch(err => {
      this.setState({ message: "Transaction Aborted by User." });
    });
    this.setState({ button: true });
  };

  onClick = async () => {
    const accounts = await web3.eth.getAccounts();
    // console.log(accounts);
    if(accounts[0] !== this.state.manager){
      alert('You do not have the authority.');
      return;
    }
    if(this.state.players.length === 0){
      alert('No players found.');
      return;
    }
    this.setState({ button: false });
    this.setState({ message: "Wait for transaction to complete..." });
    await lottery.methods.pickWinner().send({
      from: accounts[0]
    }).then(async details => {
      const winner = await lottery.methods.winner().call();
      this.setState({ players: [],balance: '',message: 'A winner has been picked.',previousWinner: `${winner} [ declared on ${Date().toLocaleString()} ]` });
    }).catch(err => {
      this.setState({ message: "Winner is not picked yet as per manager's preferences." });
    });
    this.setState({ button: true });
  };

  render() {
    return (
      <div className="App">
        <h2>LOTTERY CONTRACT</h2>
        <p>
          The manager of this contract is <b>{this.state.manager}</b>.
          There are currently <b>{this.state.players.length} people</b> entered, competing to win <b>{web3.utils.fromWei(this.state.balance,'ether')} ethers</b>.
        </p>

        <hr />

        <form onSubmit={this.onSubmit}>
          <h4>Want to try ur luck?</h4>
          <div>
            <label>Amount of ether to enter</label>&nbsp;&nbsp;
            <input placeholder="enter value > 0.01 ether" value={this.state.value} onChange={event => this.setState({ value: event.target.value })} required />
          </div>
          <button disabled={!this.state.button}>Enter</button>
        </form>
        <hr />
        <h4>Time to pick a Winner</h4>
        <button onClick={this.onClick} disabled={!this.state.button}>Pick a Winner</button>
        <hr />
        <h3>Status : {this.state.message}</h3>
        <hr />
        <h4>Previous Winner : {this.state.previousWinner}</h4>
      </div>
    );
  }
}
export default App;
