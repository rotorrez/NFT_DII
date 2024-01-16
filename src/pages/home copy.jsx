/* eslint-disable */
import React, { useEffect, useState } from "react";
import Web3 from "web3";
import axios from "axios";
import Web3Modal from "web3modal";
import Contract from "../truffle/abis/NFT.json";

const loadContract = async () => {
  try {
    //THIS ALLOWS YOU TALK TO BLOCKCHAIN
    const web3Modal = new Web3Modal({
      network: "mainnet", // optional
      cacheProvider: true, // optional
      providerOptions: {}, // required
    });
    const provider = await web3Modal.connect();
    const web3 = new Web3(provider);
    const netId = await web3.eth.net.getId();
    //THIS WILL LOAD YOUR CONTRACT FROM BLOCKCHAIN
    const contract = new web3.eth.Contract(
      Contract.abi,
      Contract.networks[netId].address
    );

    // GET THE AMOUNT OF NFTs MINTED
    const totalSupply = await contract.methods.totalSupply().call();
    console.log(`totalSupply ${totalSupply}`);

    //  UNCOMMENT THIS BLOCK ONCE YOU HAVE MINTED AN NFT
    
    // THE TOKEN ID YOU WANT TO QUERY
    const tokenID = 2;

    // GET THE TOKEN URI
    // THE URI IS THE LINK TO WHERE YOUR JSON DATA LIVES
    const uri = await contract.methods.tokenURI(tokenID).call();
    console.log("uri: ", uri);

    // GET THE OWNER OF A SPECIFIC TOKEN
    const owner = await contract.methods.ownerOf(tokenID).call();
    console.log("owner: ", owner);
    setOwner(owner);
    // CHECK IF A SPECIFIC TOKEN IS SOLD
    const sold = await contract.methods.sold(tokenID).call();
    console.log("sold: ", sold);

    // GET PRICE OF A SPECIFIC TOKEN
    const price = await contract.methods.price(tokenID).call();
    console.log("price: ", price);
    // 
  } catch (e) {
    console.log("error = ", e);
  }
};

const Home = () => {
  const [owner, setOwner] = useState(null);
  const [imagePath, updatePath] = useState(null);
  useEffect(() => {
    loadContract();

    //  uncomment this to demostrate an NFT image url from ipfs
   
    (async () => {
      try {
        const YOUR_ID = "QmdF2LgSRbm8jYAidRiK41aBUmb7t1M1Xam3woyUVGGeAU";
        updatePath(`https://ipfs.io/ipfs/${YOUR_ID}`);
      } catch (e) {
        console.log("swallow error");
      }
    })();
    // 
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        textAlign: "justify",
        width: "500px",
        border: "8px blue solid",
        boxShadow: "0 0 12px rgba(0,0,0,0.5)",
        borderRadius: "20px",
        margin: "100px auto",
        fontSize: "20px",
        padding: "20px",
      }}
    >
      <p>NFT React Master IoT</p>
      <p>
        Crear un NFT en un blockchain local Ganache
        <br />
        <br />
        <br />
        En la Consola se pueden ver los valores luego de Mint un NFT. 
        Por ejemplo la imagen de la UCM:
      </p>
      <div>
      {/* El resto de tu interfaz de usuario */}
      {owner && <p>Propietario del token: {owner}</p>}
    </div>
      {imagePath && <img src={imagePath} />}
    </div>
  );
};

export default Home;
