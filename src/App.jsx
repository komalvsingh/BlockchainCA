import React, { useEffect, useState } from "react";
import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";
import MinimalFoodSupplyChain from "../build/contracts/MinimalFoodSupplyChain.json"; // Import the ABI JSON

function App() {
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);
  const [productId, setProductId] = useState("");
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [status, setStatus] = useState("");
  const [productDetails, setProductDetails] = useState(null);
  const [statusHistory, setStatusHistory] = useState([]);

  useEffect(() => {
    const init = async () => {
      const provider = await detectEthereumProvider();
      if (provider) {
        const web3 = new Web3(provider);
        const accounts = await web3.eth.requestAccounts();

        // Contract ABI and Address from JSON file
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = MinimalFoodSupplyChain.networks[networkId];
        const instance = new web3.eth.Contract(
          MinimalFoodSupplyChain.abi,
          deployedNetwork && deployedNetwork.address
        );

        setAccount(accounts[0]);
        setContract(instance);
      } else {
        console.error("Please install MetaMask!");
      }
    };
    init();
  }, []);

  const addProduct = async () => {
    if (contract && productId && name && quantity > 0) {
      try {
        await contract.methods
          .addProduct(productId, name, quantity)
          .send({ from: account });
        alert("Product added successfully!");
      } catch (error) {
        console.error(error);
      }
    }
  };

  const updateProductStatus = async () => {
    if (contract && productId && status) {
      try {
        await contract.methods
          .updateProductStatus(productId, status)
          .send({ from: account });
        alert("Status updated successfully!");
      } catch (error) {
        console.error(error);
      }
    }
  };

  const getProductDetails = async () => {
    if (contract && productId) {
      try {
        const details = await contract.methods
          .getProductDetails(productId)
          .call();
        setProductDetails(details);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const getStatusHistory = async () => {
    if (contract && productId) {
      try {
        const history = await contract.methods
          .getStatusHistory(productId)
          .call();
        setStatusHistory(history);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="App">
      <h1>Minimal Food Supply Chain</h1>

      <div>
        <h2>Add Product</h2>
        <input
          type="text"
          placeholder="Product ID"
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
        />
        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value))}
        />
        <button onClick={addProduct}>Add Product</button>
      </div>

      <div>
        <h2>Update Product Status</h2>
        <input
          type="text"
          placeholder="Product ID"
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
        />
        <input
          type="text"
          placeholder="Status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        />
        <button onClick={updateProductStatus}>Update Status</button>
      </div>

      <div>
        <h2>Get Product Details</h2>
        <input
          type="text"
          placeholder="Product ID"
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
        />
        <button onClick={getProductDetails}>Get Details</button>
        {productDetails && (
          <div>
            <p>Product Name: {productDetails.name}</p>
            <p>Quantity: {productDetails.quantity}</p>
          </div>
        )}
      </div>

      <div>
        <h2>Get Status History</h2>
        <input
          type="text"
          placeholder="Product ID"
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
        />
        <button onClick={getStatusHistory}>Get Status History</button>
        <ul>
          {statusHistory.map((stat, index) => (
            <li key={index}>{stat}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
