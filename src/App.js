import logo from "./coin-svgrepo-com.svg";
import "./App.css";
import { ethereum } from "./metamask";
import { ethersContract } from "./web3";
import { useState } from "react";

function App() {
  let errorMsg = "";
  const [accounts, setAccounts] = useState([]);

  const handleConnectWallet = async (e) => {
    e.preventDefault();
    try {
      const account = await ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccounts(account);
    } catch (error) {
      console.error(error);
      errorMsg = error.message;
    }
  };

  const handleSendCoins = async (e) => {
    e.preventDefault();
    try {
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      const to = document.getElementById("to").value;
      const amount = Number(document.getElementById("amount").value);

      const tx = await ethersContract.transfer(to, amount);

      await tx.wait();

      console.log(tx);
    } catch (error) {
      console.error(error);
      errorMsg = error.message;
    }
  };

  const SendCoinsForm = () => {
    return (
      <div className="w-1/3 h-1/3 flex flex-col">
        <form
          className="flex flex-col border-spacing-2 border-slate-200 border-2 p-2 rounded-md"
          onSubmit={handleSendCoins}
        >
          <div className="flex flex-col items-start">
            <label className="text-2xl" htmlFor="to">
              Para:
            </label>
            <input
              className="text-black text-base w-full px-1"
              type="text"
              id="to"
              name="to"
            />
            <label className="text-xs mb-2" htmlFor="to">
              Não sabe para quem enviar?
              0x8C63Db2ca0e67094F96Bd44b5aEab279b21EA1d0
            </label>
          </div>
          <div className="flex flex-col items-start">
            <label className="text-2xl" htmlFor="amount">
              Quantidade:
            </label>
            <input
              className="text-black text-base w-full px-1"
              type="number"
              id="amount"
              name="amount"
            />
          </div>
          <div className="flex flex-col items-end">
            <button
              className="text-lg justify-center bg-amber-400 hover:bg-amber-500 disabled:bg-amber-500 text-gray-800 font-bold mt-5 py-1 px-1 rounded inline-flex items-center"
              type="submit"
            >
              Enviar!
            </button>
          </div>
        </form>
        <p className="text-red-600">{errorMsg}</p>
      </div>
    );
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo w-24" alt="logo" />
        <p>Envie suas moedas para outros goBlockers!</p>
        {/* Clean grey button */}
        <button
          className="w-44 h-9 text-base justify-center my-8 bg-amber-400 hover:bg-amber-500 disabled:bg-amber-500 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
          onClick={handleConnectWallet}
          disabled={accounts.length > 0}
        >
          {accounts.length > 0 ? "Conectado!" : "Conectar Wallet"}
        </button>
        {accounts.length > 0 && <SendCoinsForm />}
      </header>
    </div>
  );
}

export default App;
