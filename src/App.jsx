import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import MinimalFoodSupplyChain from '../build/contracts/MinimalFoodSupplyChain.json'; // Assuming the ABI and contract address are in this JSON

function App() {
  const [account, setAccount] = useState('');
  const [contract, setContract] = useState(null);
  const [foodItems, setFoodItems] = useState([]);
  const [foodItemName, setFoodItemName] = useState('');
  const [foodItemCount, setFoodItemCount] = useState(0);

  useEffect(() => {
    loadWeb3();
    loadBlockchainData();
  }, []);

  // Load web3 instance and account
  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.request({ method: 'eth_requestAccounts' });
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      alert('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }
  };

  // Load account and contract details
  const loadBlockchainData = async () => {
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    setAccount(accounts[0]);

    // Network ID (Ganache is usually 5777)
    const networkId = await web3.eth.net.getId();
    const networkData = MinimalFoodSupplyChain.networks[networkId];
    if (networkData) {
      const abi = MinimalFoodSupplyChain.abi;
      const address = networkData.address;
      const contractInstance = new web3.eth.Contract(abi, address);
      setContract(contractInstance);

      const itemCount = await contractInstance.methods.foodItemCount().call();
      setFoodItemCount(itemCount);

      // Load existing food items
      const items = [];
      for (let i = 1; i <= itemCount; i++) {
        const foodItem = await contractInstance.methods.foodItems(i).call();
        items.push(foodItem);
      }
      setFoodItems(items);
    } else {
      alert('Smart contract not deployed to the detected network.');
    }
  };

  // Create a new food item
  const createFoodItem = async () => {
    if (foodItemName && contract) {
      await contract.methods.createFoodItem(foodItemName).send({ from: account });
      window.location.reload(); // Reload to reflect changes
    } else {
      alert('Please provide a valid name.');
    }
  };

  return (
    <div className="App">
      <h1>Minimal Food Supply Chain</h1>
      <p>Account: {account}</p>

      <h2>Create Food Item</h2>
      <input
        type="text"
        placeholder="Enter food item name"
        value={foodItemName}
        onChange={(e) => setFoodItemName(e.target.value)}
      />
      <button onClick={createFoodItem}>Create</button>

      <h2>Food Items List</h2>
      <ul>
        {foodItems.map((item) => (
          <li key={item.id}>
            ID: {item.id}, Name: {item.name}, Owner: {item.owner}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
