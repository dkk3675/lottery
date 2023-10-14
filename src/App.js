import "./App.css";
import React from "react";
import web3 from "./web3";
import lottery from "./lottery";
import axios from "axios";
import LotteryImage from "./lottery.png";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      manager: "",
      players: [],
      balance: "",
      value: "",
      previousWinner: "--",
      button: true,
      isManager: false,
    };
  }

  async componentDidMount() {
    if (!window.ethereum) return;
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    window.ethereum.on("accountsChanged", this.handleAccountsChanged);
    const manager = await lottery.methods.manager().call();
    const isManager = manager.toLowerCase() === accounts[0].toLowerCase();

    const players = await lottery.methods.getPlayers().call();
    const balance = await web3.eth.getBalance(lottery.options.address);
    const winner = await axios
      .get(process.env.REACT_APP_SERVER)
      .catch((err) => console.log(err));

    const timestamp = new Date(winner.data.createdAt);

    this.setState({
      manager: manager,
      players: players,
      balance: balance,
      previousWinner: winner.data.id
        ? `${winner.data.winner} [ declared on ${timestamp.toLocaleString(
            "en",
            {
              timeZoneName: "long",
              timeZone: "IST",
              weekday: "short",
              year: "numeric",
              month: "short",
              day: "numeric",
              hour12: true,
              hour: "numeric",
              minute: "numeric",
              second: "numeric",
            }
          )} ] won ${winner.data.value} ether`
        : "--",
      isManager: isManager,
    });
  }

  handleAccountsChanged = (accounts) => {
    // Check if the current selected account is the manager
    const isManager =
      this.state.manager.toLowerCase() === accounts[0].toLowerCase();
    this.setState({ isManager });
  };

  componentWillUnmount() {
    // Remove the event listener when the component unmounts
    if (window.ethereum) {
      window.ethereum.removeListener(
        "accountsChanged",
        this.handleAccountsChanged
      );
    }
  }

  onSubmit = async (event) => {
    event.preventDefault();
    if (this.state.value <= 0.01) {
      this.showErrorMessage(
        `Ether of value greater than 0.01 ether is required to enter`
      );
      return;
    }
    this.setState({ button: false });
    const accounts = await web3.eth.getAccounts();
    this.showWaitingForTransactionMessage();
    await lottery.methods
      .enter()
      .send({
        from: accounts[0],
        value: web3.utils.toWei(this.state.value, "ether"),
      })
      .then(async (details) => {
        toast.dismiss();
        this.showTransactionMessage(
          `Transaction completed. Transaction ID - ${details.transactionHash}`
        );
        const players = await lottery.methods.getPlayers().call();
        const balance = await web3.eth.getBalance(lottery.options.address);
        this.setState({ players: players, balance: balance, value: "" });
      })
      .catch((err) => {
        toast.dismiss();
        this.showErrorMessage("Transaction Aborted by User.");
      });
    this.setState({ button: true });
  };

  showTransactionMessage = (message) => {
    toast.success(message, {
      position: "top-left",
      autoClose: false,
      closeOnClick: true,
      style: {
        width: "fit-content",
      },
    });
  };

  showWaitingForTransactionMessage = () => {
    toast.info("Waiting for transaction to complete...", {
      position: "top-left",
      autoClose: false, // Keep the toast open until you manually close it
      closeOnClick: false, // Prevent the user from closing the toast
      closeButton: false,
    });
  };

  showErrorMessage = (message) => {
    toast.error(message, { position: "top-left", autoClose: 3000 });
  };

  onClick = async () => {
    const accounts = await web3.eth.getAccounts();
    // console.log(accounts);
    if (accounts[0] !== this.state.manager) {
      this.showErrorMessage("You do not have the authority.");
      return;
    }
    if (this.state.players.length === 0) {
      this.showErrorMessage("No players found.");
      return;
    }
    this.setState({ button: false });
    this.showWaitingForTransactionMessage();
    await lottery.methods
      .pickWinner()
      .send({
        from: accounts[0],
      })
      .then(async (details) => {
        await lottery.methods
          .winner()
          .call()
          .then(async (winner) => {
            const timestamp = new Date().toLocaleString("en", {
              timeZoneName: "long",
              timeZone: "IST",
              weekday: "short",
              year: "numeric",
              month: "short",
              day: "numeric",
              hour12: true,
              hour: "numeric",
              minute: "numeric",
              second: "numeric",
            });
            await axios
              .post(process.env.REACT_APP_SERVER, {
                winner: winner,
                no_of_participations: this.state.players.length,
                value: web3.utils.fromWei(this.state.balance, "ether"),
              })
              .then((response) => {
                toast.dismiss();
                this.showTransactionMessage("A winner has been picked.");
                this.setState({
                  players: [],
                  balance: "",
                  previousWinner: `${response.data.winner} [ declared on ${timestamp} ] won ${response.data.value} ether`,
                });
              })
              .catch((err) => console.log(err));
          });
      })
      .catch((err) => {
        toast.dismiss();
        this.showErrorMessage(
          "Winner is not picked yet as per manager's preferences."
        );
      });
    this.setState({ button: true });
  };

  render() {
    return (
      <div className="App">
        <ToastContainer position="top-left" />
        <img src={LotteryImage} alt="Lottery" className="lottery-image" />
        <h2>LOTTERY CONTRACT</h2>
        {window.ethereum && window.ethereum.selectedAddress && (
          <p>
            The manager of this contract is <b>{this.state.manager}</b>. There
            are currently <b>{this.state.players.length} people</b> entered,
            competing to win{" "}
            <b>{web3.utils.fromWei(this.state.balance, "ether")} ethers</b>.
          </p>
        )}

        <hr />

        {window.ethereum ? (
          <div>
            {window.ethereum.selectedAddress ? (
              <div>
                <form onSubmit={this.onSubmit} className="entry-form">
                  <h4>Want to try your luck?</h4>
                  <div className="input-container">
                    <label>Amount of ether to enter</label>
                    <input
                      type="number"
                      placeholder="Enter value > 0.01 ether"
                      value={this.state.value}
                      onChange={(event) =>
                        this.setState({ value: event.target.value })
                      }
                      required
                    />
                  </div>
                  <button
                    className="entry-button"
                    disabled={this.state.manager === "" || !this.state.button}
                    onClick={this.openModal}
                  >
                    Enter
                  </button>
                </form>

                {this.state.isManager && (
                  <div className="winner-section">
                    <hr />
                    <h4>Time to pick a Winner</h4>
                    <button
                      onClick={this.onClick}
                      className="winner-button"
                      disabled={!this.state.button}
                    >
                      Pick a Winner
                    </button>
                  </div>
                )}

                <hr />

                <h4 className="previous-winner">
                  Recent Winner: {this.state.previousWinner}
                </h4>
              </div>
            ) : (
              <div className="no-metamask">
                  <p>Please connect to Metamask to use this application.</p>
              </div>
            )}
          </div>
        ) : (
          <div className="no-metamask">
            <p>Please install Metamask to use this application.</p>
          </div>
        )}
      </div>
    );
  }
}

export default App;
