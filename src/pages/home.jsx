/* eslint-disable */
import React, { useEffect, useState } from "react";
import Web3 from "web3";
import axios from "axios";
import Web3Modal from "web3modal";
import Contract from "../truffle/abis/NFT.json";


const Home = () => {
  const [owner, setOwner] = useState(null);
  const [totalSupply, setTotalSupply] = useState(null);
  const [uri, setUri] = useState(null);
  const [sold, setSold] = useState(null);
  const [price, setPrice] = useState(null);
  const [imagePath, updatePath] = useState(null);
  
  useEffect(() => {
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
        setTotalSupply(totalSupply);
        
        // THE TOKEN ID YOU WANT TO QUERY
        const tokenID = 2;
    
        // GET THE TOKEN URI
        const uri = await contract.methods.tokenURI(tokenID).call();
        setUri(uri);
    
        // GET THE OWNER OF A SPECIFIC TOKEN
        const owner = await contract.methods.ownerOf(tokenID).call();
        setOwner(owner);
        // CHECK IF A SPECIFIC TOKEN IS SOLD
        const sold = await contract.methods.sold(tokenID).call();
        setSold(sold);
    
        // GET PRICE OF A SPECIFIC TOKEN
        const price = await contract.methods.price(tokenID).call();
        setPrice(price);
        // 
      } catch (e) {
        console.log("error = ", e);
      }
    };
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
        width: "725px",
        border: "8px black solid",
        boxShadow: "0 0 12px rgba(0,0,0,0.5)",
        borderRadius: "20px",
        margin: "100px auto",
        fontSize: "20px",
        padding: "20px",
      }}
    >
      <p><center><h1>NFT REACT MASTER IoT</h1></center></p>

      <h2><center>Crear NFTs en un Blockchain Local GANACHE</center></h2>

       {totalSupply && <p>- GET THE AMOUNT OF NFTs MINTED: <b>{totalSupply}</b></p>}
       {uri && <p>- GET THE LAST TOKEN URI: <b>{uri}</b></p>}
       {owner && <p>- OWNER OF LAST SPECIFIC TOKEN: <b>{owner}</b></p>}    
       {sold && <p>- CHECK IF LAST SPECIFIC TOKEN IS SOLD: <b>{sold}</b></p>}    
       {price && <p>- GET PRICE OF LAST SPECIFIC TOKEN: <b>{price}</b></p>} 
       <p>- SHOW IMAGE FROM LAST TOKEN:</p>
       {imagePath && <img src={imagePath} />}
    </div>
  );
};


export default Home;
