# NFT REACT MASTER IoT

# INTRODUCCION

```
Este proyecto es una actualización al project "nft-react-boilerplate": 
https://github.com/gary-george/nft-react-boilerplate

Se siguieron los pasos del BLOG POST:
https://medium.com/coinmonks/guide-to-creating-your-own-nft-with-javascript-solidity-part-1-of-3-7909b80fae94


Este proyecto nos ayuda a comprender acerca de la creación de NFTs y sus componentes asociados.
Forma parte de la Práctica libre sobre Blockchain del MASTER IoT de la UCM.

```

# HERRAMIENTAS

```
 - React 
 - Truffle 
 - IPFS 
 - Solidity 
 - Web3JS 
 - Ganache 

```

# IPFS

```
Se utiliza un archivo IPFS (./utils/ipfs.js)

Este archivo upload una imagen al IFPS (https://www.pinata.cloud/), y retorna un IpfsHash.

```

# COMANDOS TRUFFLE 

```
1 - Para compilar los Contratos y crear archivos ABI 
truffle compile

2 - Para deployar el Contrato en nuestra Red Local Ganache
truffle migrate --reset

3 - Para mint nuestra imagen see ejecuta el script
truffle exec src/utils/mint.js

```
